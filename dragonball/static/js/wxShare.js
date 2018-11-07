function shareWeiChat() {
	alert();
	alert(window.location.href);
	alert(window.location.href.length);
	alert(window.location.href.indexOf('='));
	var host = window.location.host;
	var shareUrl, imgUrl, shareTitle, shareDesc, appid, appsecret, timestamp, nonceStr, jsapi_ticket, url,
		signature;
	imgUrl = "http://h5.vigoo.cn/static/img/dragon-share.jpg"; // 分享图片
	shareTitle = "调查问卷"; // 分享title
	shareDesc = "为了让联想为您提供更专业的服务，来参与吧！"; // 分享描述
	shareUrl = "http://h5.mbur.cn/jd_travel/index.html"; // 分享地址
	url = location.href.split('#')[0];
	var weixin_share_param_url = "http://wechat.mbur.cn/share/getShareInfo";
	console.log(url);
	var param = [];
	$.ajax({
		url: weixin_share_param_url,
		type: 'GET',
		cache: false,
		async: false,
		dataType: 'json',
		success: function(res) {
			if (res.status = "OK") {
				appid = res.data.appid;
				timestamp = res.data.timestamp; //时间戳
				nonceStr = res.data.nonceStr; //随机字符串
				jsapi_ticket = res.data.jsapi_ticket; //微信jsapi调用凭据
				var str1 = "jsapi_ticket=" + jsapi_ticket + "&noncestr=" + nonceStr + "&timestamp=" + timestamp + "&url=" + url;
				console.log(str1);
				signature = hex_sha1(str1); //得到的签名
				wx.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: appid, // 必填，公众号的唯一标识
					timestamp: timestamp, // 必填，生成签名的时间戳
					nonceStr: nonceStr, // 必填，生成签名的随机串
					signature: signature, // 必填，签名
					jsApiList: [ // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
						'checkJsApi',
						'onMenuShareTimeline',
						'onMenuShareAppMessage',
						'hideMenuItems',
						'getNetworkType',
						'closeWindow',
						'hideMenuItems',
						'showMenuItems'
					]
				});

				//config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后
				//config是一个客户端的异步操作，所以如果需要在 页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。
				//对于用户触发时才调用的接口，则可以直接调用，不需要放在ready 函数中。
				wx.ready(function() {
					//批量隐藏右上角菜单
					wx.hideMenuItems({
						menuList: [
								"menuItem:share:qq", //分享到QQ
								"menuItem:share:weiboApp", //分享到微博
								"menuItem:favorite", //收藏按钮
								"menuItem:share:facebook", //分享到fb
								"menuItem:share:QZone", //分享到QQ空间
								"menuItem:editTag", //编辑标签
								"menuItem:delete", //删除
								/*"menuItem:copyUrl",//复制链接*/
								"menuItem:originPage", //原网页
								"menuItem:readMode", //阅读模式
								"menuItem:openWithQQBrowser", //在QQ浏览器打开
								"menuItem:openWithSafari", //在safari浏览器打开
								"menuItem:share:email", //发送邮件
								"menuItem:share:timeline"
								//"menuItem:share:brand"//一些特殊公众号
							] // 要隐藏的菜单项，所有menu项见附录3
					});
					wx.checkJsApi({
						jsApiList: [
							'onMenuShareTimeline',
							'onMenuShareAppMessage',
							'getNetworkType',
							'closeWindow',
							/*'showMenuItems',*/
							'hideMenuItems'
						]
					});
					wx.showMenuItems({
						menuList: [
								"menuItem:share:appMessage", //发送给朋友
								"menuItem:share:timeline", //分享到朋友圈
								"menuItem:copyUrl"
							] // 要显示的菜单项，所有menu项见附录3
					});

					wx.error(function(res) {
						// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
					});
					//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
					wx.onMenuShareTimeline({
						title: shareTitle, // 分享标题
						link: shareUrl, // 分享链接
						imgUrl: imgUrl, // 分享图标
						success: function() {
							saveObtain("转发视频", 100, videoId);
							//console.log("转发视频获取表情记录100！");
							saveShare(videoId);
						},
						cancel: function() {
							// 用户取消分享后执行的回调函数
							//alert("分享已取消！");
						}
					});
					//获取“分享给朋友”按钮点击状态及自定义分享内容接口
					wx.onMenuShareAppMessage({
						title: shareTitle, // 分享标题
						desc: shareDesc, // 分享描述  联想超融合HX系列稳敏结合，为业务系统提供强劲引擎
						link: shareUrl, // 分享链接
						imgUrl: imgUrl, // 分享图标
						//type: '', // 分享类型,music、video或link，不填默认为link
						//dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
						success: function() {
							// 用户确认分享后执行的回调函数
							//alert("分享成功！");
							saveObtain("转发视频", 100, videoId);
							//console.log("转发视频获取表情记录100！");
							saveShare(videoId);
						},
						cancel: function() {
							// 用户取消分享后执行的回调函数
							//alert("分享已取消！");
						}
					});
				});
			}
		}
	});
}
setTimeout(function () {
	shareWeiChat();
}, 1000);