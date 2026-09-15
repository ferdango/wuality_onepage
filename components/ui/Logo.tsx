import Image from "next/image";

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className="group flex items-center gap-3" aria-label="Wuality — inicio">
      <Image
        src="/media/brand/isotype-red.svg"
        alt=""
        width={66}
        height={36}
        priority
        className="h-[clamp(22px,1.875vw,36px)] w-auto transition-transform duration-500 ease-wuality group-hover:scale-110"
      />
      {!compact && (
        <span className="text-[clamp(20px,1.6667vw,32px)] font-bold tracking-[0.06em] text-bone">
          Wuality
        </span>
      )}
    </a>
  );
}
