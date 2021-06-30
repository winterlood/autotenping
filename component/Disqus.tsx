import Head from "next/head";
import React, { useState, useEffect } from "react";
type Props = {};
const diqusScript = `
(function() { // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = 'https://https-somuneza-site.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
    })();
`;
const Disqus = () => {
    return (
        <div className="disqus_box">
            <Head>
                <script dangerouslySetInnerHTML={{ __html: diqusScript }}></script>
                <script id="dsq-count-scr" src="//https-somuneza-site.disqus.com/count.js" async></script>
            </Head>
            <h4>💬 댓글 달기</h4>
            <div id="disqus_thread"></div>
        </div>
    );
};

export default Disqus;
