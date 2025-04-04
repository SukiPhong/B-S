import { useEffect, useState } from "react";
import PropTypes from "prop-types";
const Image = ({ src, fallbackSrc, alt}) => {
  const [imgDefault, setImgDefault] = useState(src);
  useEffect(() => {
    if (src) setImgDefault(src);
    else if (src === null) setImgDefault(fallbackSrc);
    else setImgDefault(fallbackSrc);
  }, [src, fallbackSrc]);
  return (
    <div>
      <img
        loading="lazy"
        className="rounded-full"
        src={imgDefault}
        alt={alt}
        onError={() => {
          setImgDefault(fallbackSrc);
        }}
      />
    </div>
  );
};

export default Image;
Image.propTypes = {
  src: PropTypes.string,
  fallbackSrc: PropTypes.string,
  alt: PropTypes.string,
};
