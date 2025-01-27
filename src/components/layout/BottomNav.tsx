"use client";

import Image from "next/image";
import { Language } from "@/lib/i18n";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BottomNavProps {
  lang: Language;
}

const navItems = {
  ko: [
    {
      href: "/ko/job",
      label: "홈",
      icon: "/icons/nav-job.48x48.png",
      iconActive: "/icons/nav-job-active.48x48.png",
    },
    {
      href: "/ko/community",
      label: "커뮤니티",
      icon: "/icons/nav-life.48x48.png",
      iconActive: "/icons/nav-life-active.48x48.png",
    },
    {
      href: "/ko/content",
      label: "콘텐츠",
      icon: "/icons/nav-home.48x48.png",
      iconActive: "/icons/nav-home-active.48x48.png",
    },
    {
      href: "/ko/chat",
      label: "채팅",
      icon: "/icons/nav-chat.48x48.png",
      iconActive: "/icons/nav-chat-active.48x48.png",
    },
    {
      href: "/ko/setting",
      label: "내 정보",
      icon: "/icons/nav-setting.48x48.png",
      iconActive: "/icons/nav-setting-active.48x48.png",
    },
  ],
  en: [
    {
      href: "/en/job",
      label: "Home",
      icon: "/icons/nav-job.48x48.png",
      iconActive: "/icons/nav-job-active.48x48.png",
    },
    {
      href: "/en/community",
      label: "Community",
      icon: "/icons/nav-life.48x48.png",
      iconActive: "/icons/nav-life-active.48x48.png",
    },
    {
      href: "/en/content",
      label: "Contents",
      icon: "/icons/nav-home.48x48.png",
      iconActive: "/icons/nav-home-active.48x48.png",
    },
    {
      href: "/en/chat",
      label: "Chat",
      icon: "/icons/nav-chat.48x48.png",
      iconActive: "/icons/nav-chat-active.48x48.png",
    },
    {
      href: "/en/setting",
      label: "My Info",
      icon: "/icons/nav-setting.48x48.png",
      iconActive: "/icons/nav-setting-active.48x48.png",
    },
  ],
};

const BottomNav = ({ lang }: BottomNavProps) => {
  const pathname = usePathname();
  const items = navItems[lang];

  return (
    <div className="flex flex-shrink-0 h-14 justify-around bg-white items-stretch border-t border-neutral-300 z-[1]">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="relative w-full flex flex-col justify-center items-center gap-1 py-2 cursor-pointer overflow-hidden"
        >
          <div className="flex-shrink-0 relative size-6 bg-center bg-contain bg-no-repeat pointer-events-none">
            <Image
              src={pathname === item.href ? item.iconActive : item.icon}
              alt={item.label}
              width={24}
              height={24}
            />
          </div>
          <p className="w-full text-center text-caption3 pointer-events-none">
            {item.label}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default BottomNav;
