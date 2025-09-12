import { useTheme } from 'styled-components';

const IcnDropdownCircle = ({ arrowColor, circleColor, width = 26, height = 26 }) => {
    const theme = useTheme();
    const reflectArrowColor = arrowColor ? arrowColor : theme.MAIN_THEME_COLOR;
    const reflectCircleColor = circleColor ? circleColor : theme.PALE_THEME_COLOR;

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 26 26">
            <g id="그룹_2930" data-name="그룹 2930" transform="translate(-340 -39)">
                <g id="그룹_2929" data-name="그룹 2929">
                    <circle id="타원_164" data-name="타원 164" cx="13" cy="13" r="13" transform="translate(340 39)" fill={reflectCircleColor} />
                </g>
                <g id="그룹_3877" data-name="그룹 3877" transform="translate(1328.432 274.159) rotate(180)">
                    <path
                        id="패스_446"
                        data-name="패스 446"
                        d="M0,0H7.415V7.607"
                        transform="translate(970.121 224.212) rotate(-45)"
                        fill="none"
                        stroke={reflectArrowColor}
                        strokeLinecap="round"
                        strokeWidth="2"
                    />
                </g>
            </g>
        </svg>
    );
};

export default IcnDropdownCircle;
