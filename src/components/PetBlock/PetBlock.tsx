import css from "./PetBlock.module.css";

interface ResponsiveImages {
  mobile: string;
  tablet?: string;
  desktop?: string;
}

interface PetBlockProps {
  images: ResponsiveImages;
  alt?: string;
  variant?: "auth" | "profile" | "add-pet";
  className?: string;
  style?: React.CSSProperties;
}

export default function PetBlock({
  images,
  alt = "Pet",
  variant,
  className,
  style,
}: PetBlockProps) {
  return (
    <div
      className={`petBlock ${variant ?? ""} ${className ?? ""}`}
      style={style}
    >
      <picture>

        {images.desktop && (
          <source
            media="(min-width: 1280px)"
            srcSet={images.desktop}
          />
        )}

        {images.tablet && (
          <source
            media="(min-width: 768px)"
            srcSet={images.tablet}
          />
        )}

        <img
          src={images.mobile}
          alt={alt}
          className={css.petImage}
          loading="lazy"
        />
      </picture>
    </div>
  );
}