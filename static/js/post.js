---
    layout: null
---

/**
 * 页面ready方法
 */
$(document).ready(function() {
    generateContent();
    // share();
    //gitment();
	gitalk();
});

/**
 * 侧边目录
 */
function generateContent() {
    var $mt = $('.toc');
    var toc = $(".post ul#markdown-toc").clone().get(0);
    $mt.each(function(i,o){
        $(o).html(toc);
    });
}

function share(){
    window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"1","bdSize":"24"},"share":{}};
    with(document)0[getElementsByTagName("script")[0].parentNode.appendChild(createElement('script')).src='//bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
}


function gitment() {
    var gitment = new Gitment({
        id: window.location.pathname,
        owner: '{{site.github.username}}',
        repo: '{{site.gitment.repo}}',
        oauth: {
            client_id: '{{site.gitment.client_id}}',
            client_secret: '{{site.gitment.client_secret}}',
        },
    });
    gitment.render('post-comment')
    $("#post-comment").removeClass('hidden');
}


function gitalk(){
	var gitalk = new Gitalk({
	  clientID: 'e3f03ff88087909e1dc4',
	  clientSecret: 'd8c3df3635bfbb8b26be5f133c3196a2bc1c2799',
	  repo: 'yybingyybing',
	  owner: 'yybingyybing',
	  admin: ['yybingyybing'],
	  id: location.pathname,      // Ensure uniqueness and length less than 50
	  distractionFreeMode: false  // Facebook-like distraction free mode
	})
	
	gitalk.render('gitalk-container')
}