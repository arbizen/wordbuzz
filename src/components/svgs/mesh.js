export const Mesh1 = ({ className }) => {
  return (
    <svg
      width="1157"
      height="976"
      viewBox="0 0 1157 976"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.2" filter="url(#filter0_f_92_387)">
        <ellipse
          cx="575.644"
          cy="416.343"
          rx="502.5"
          ry="147"
          transform="rotate(43.0279 575.644 416.343)"
          fill="#2563EB"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_92_387"
          x="-5.23822"
          y="-143.081"
          width="1161.77"
          height="1118.85"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="100"
            result="effect1_foregroundBlur_92_387"
          />
        </filter>
      </defs>
    </svg>
  );
};

export const Mesh2 = ({ className }) => {
  return (
    <svg
      className={className}
      width="1440"
      height="1054"
      viewBox="0 0 1440 1054"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.2" filter="url(#filter0_f_92_425)">
        <ellipse
          cx="747.916"
          cy="527.196"
          rx="823.799"
          ry="131.438"
          transform="rotate(158.447 747.916 527.196)"
          fill="#2563EB"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_92_425"
          x="-219.827"
          y="0.713379"
          width="1935.48"
          height="1052.96"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="100"
            result="effect1_foregroundBlur_92_425"
          />
        </filter>
      </defs>
    </svg>
  );
};

export const MeshTitle = ({ no }) => {
  return (
    <div className="relative flex h-[200px] w-[200px] justify-center items-center">
      <h1 className="text-[32px] font-bold relative z-50 text-blue-50">{no}</h1>
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        className="absolute top-0 left-0 z-40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_f_101_440)">
          <circle cx="100" cy="100" r="50" fill="#3B82F6" />
        </g>
        <defs>
          <filter
            id="filter0_f_101_440"
            x="0"
            y="0"
            width="200"
            height="200"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="25"
              result="effect1_foregroundBlur_101_440"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export const IndicatorLine = ({ className }) => {
  return (
    <svg
      width="841"
      height="593"
      viewBox="0 0 841 593"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1.5 1.5V189.5H547M457.5 591.5H839V401"
        stroke="#1D2539"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="5 10"
      />
    </svg>
  );
};
