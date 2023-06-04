export const CheckMarkSVG = () => {
   return (
      <svg
         width="40"
         height="40"
         viewBox="0 0 40 40"
         fill="none"
         xmlns="http://www.w3.org/2000/svg">
         <path
            d="M13.9877 40L0 21.0395L3.49693 16.2994L13.9877 30.5197L36.5031 0L40 4.74013L13.9877 40Z"
            fill="#0FA958"
         />
      </svg>
   );
};

interface LikedSVGProps {
   isLiked: boolean;
}

export const LikedSVG: React.FC<LikedSVGProps> = ({ isLiked }) => {
   return (
      <svg
         width="44"
         height="39"
         viewBox="0 0 44 39"
         fill="none"
         xmlns="http://www.w3.org/2000/svg">
         <mask
            id="mask0_13_149"
            style={{ maskType: 'luminance' }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="44"
            height="39">
            <path
               d="M13 2C6.925 2 2 7.02171 2 13.216C2 24.432 15 34.6283 22 37C29 34.6283 42 24.432 42 13.216C42 7.02171 37.075 2 31 2C27.28 2 23.99 3.88327 22 6.76578C20.9857 5.29261 19.6382 4.09035 18.0715 3.26077C16.5049 2.43119 14.7653 1.99873 13 2Z"
               fill="white"
               stroke="white"
               strokeWidth="4"
               strokeLinecap="round"
               strokeLinejoin="round"
            />
         </mask>
         <g mask="url(#mask0_13_149)">
            <path d="M-2 -6.15698H46V42.7855H-2V-6.15698Z" fill={isLiked ? '#F24E1E' : '#000000'} />
         </g>
      </svg>
   );
};
export const AddSVG = () => {
   return (
      <svg
         width="40"
         height="40"
         viewBox="0 0 40 40"
         fill="none"
         xmlns="http://www.w3.org/2000/svg">
         <path
            d="M17.1429 40V22.8571H0V17.1429H17.1429V0H22.8571V17.1429H40V22.8571H22.8571V40H17.1429Z"
            fill="black"
         />
      </svg>
   );
};
