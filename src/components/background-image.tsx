import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

const BackgroundImage: React.FC<{ imageUrl: string | StaticImport }> = ({
  imageUrl,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
      }}
    >
      <Image
        src={imageUrl}
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
    </div>
  );
};

export default BackgroundImage;
