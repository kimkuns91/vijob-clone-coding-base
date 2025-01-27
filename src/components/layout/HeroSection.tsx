import { FC } from "react";

const HeroSection: FC = () => {
  return (
    <div className="relative w-full bg-contain bg-no-repeat bg-center max-w-[430px] max-[860px]:max-w-full max-[860px]:hidden">
      <div className="relative w-full h-full overflow-hidden">
        <div className="relative overflow-x-hidden overflow-y-auto w-full h-full">
          <div className="relative w-[284px] h-full min-h-[640px] mx-auto text-white">
            {/* 상단 로고 */}
            <div className="absolute flex flex-col top-[40px] w-full h-fit">
              <div
                className="relative w-[116px] h-[50px] bg-no-repeat bg-contain"
                style={{ backgroundImage: "url('/logo/logo-vijob.white.svg')" }}
              />
            </div>
            {/* 텍스트 영역 */}
            <div className="absolute flex flex-col top-[18%] w-full h-fit gap-[30px]">
              <div className="relative w-full h-fit flex flex-col gap-[15px]">
                <p className="text-[24px] font-normal leading-[28.8px] tracking-[-0.96px] whitespace-pre-wrap">
                  이력서를 작성하고
                  <br />
                  취업 경쟁력을 높이세요!
                </p>
                <p className="text-[14px] font-normal leading-[16px] tracking-[-0.56px]">
                  pdf 한 장으로 체험해보세요!
                </p>
              </div>
              {/* 추후 다시 설정 필요 */}
              <div className="relative w-[140px] h-[50px] flex justify-center items-center bg-white rounded-[10px] overflow-hidden">
                <div className="absolute">
                  <div
                    className="relative w-full h-[181px] bg-no-repeat bg-contain"
                    style={{
                      backgroundImage: "url('/logo/vijob-ai.black.svg')",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* 중간 이미지 */}
            <div className="absolute flex flex-col top-[40%] w-full h-fit gap-[30px]">
              <div
                className="relative w-full h-[181px] bg-no-repeat bg-contain"
                style={{ backgroundImage: "url('/images/foreeders.svg')" }}
              />
            </div>

            {/* 하단 QR 코드 및 링크 */}
            <div className="absolute flex flex-col bottom-[20px] w-full h-fit gap-[20px]">
              <div className="relative w-full h-fit">
                <div
                  className="relative bg-white size-[74px] p-[8px] rounded-[10px]"
                  style={{ boxShadow: "0px 0px 0px 4px black" }}
                >
                  <div
                    className="relative size-full bg-no-repeat bg-contain"
                    style={{
                      backgroundImage: "url('/qrcode/store.qrcode.svg')",
                    }}
                  />
                </div>
              </div>
              <div className="relative w-full h-fit">
                <p className="text-[16px] font-bold tracking-[-0.4px]">
                  지금 바로 비잡과 함께 시작하세요.
                </p>
              </div>
              <div className="relative w-full h-fit flex flex-row gap-[6px]">
                <a
                  href="https://apps.apple.com/kr/app/vijob/id6499193089"
                  target="_blank"
                >
                  <div
                    className="relative w-[134px] h-[50px] bg-no-repeat bg-contain"
                    style={{
                      backgroundImage:
                        "url('/images/app-store-black-border.svg')",
                    }}
                  />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=net.vijob.app&pcampaignid=web_share&pli=1"
                  target="_blank"
                >
                  <div
                    className="relative w-[134px] h-[50px] bg-no-repeat bg-contain"
                    style={{
                      backgroundImage:
                        "url('/images/google-play-black-border.svg')",
                    }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
