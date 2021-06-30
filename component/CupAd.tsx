import React, { useState, useEffect } from "react";
type Props = {};
const CupAd = () => {
    return (
        <div className="top_banner center">
            <iframe
                src="https://ads-partners.coupang.com/widgets.html?id=495341&template=carousel&trackingCode=AF5219904&subId=&width=680&height=140"
                width="100%"
                height="140"
                scrolling="no"
                referrerPolicy="unsafe-url"
                className="dynamic_banner"
            ></iframe>
            위 배너는 파트너스 활동의 일환으로 소정의 수수료를 지급받을 수 있습니다
        </div>
    );
};

export default CupAd;
