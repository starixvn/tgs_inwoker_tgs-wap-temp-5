import * as React from "react";
import i18n from "../../../../../../utils/i18n";
import Marquee from "../Marquee";
import styled from "styled-components";

const AnnouncementContainer = styled.div`
  margin: 10px 23px;
  display: flex;
`;
const AnnouncementTitle = styled.div`
  font-size: 28px;

  color: #000;
  font-weight: bold;
`;
const MarqueeContainer = styled.div`
  white-space: nowrap;
  letter-spacing: 1.5px;
  font-size: 21px;

  line-hight: 26px;
  overflow: hidden;
  margin: 5px 0 0 8px;
  color: #f6f6f6;
  width: 100%;
  flex: 1;
  height: 36px;
  border-radius: 17px;
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );
`;

type Props = {};
const MobileMarquee = (props: Props) => {
  return (
    <AnnouncementContainer>
      <AnnouncementTitle>
        {i18n.t("wap.main.home.profile.announcement")}
      </AnnouncementTitle>

      <MarqueeContainer>
        <Marquee />
      </MarqueeContainer>
    </AnnouncementContainer>
  );
};

export default MobileMarquee;
