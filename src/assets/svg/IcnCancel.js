import { useTheme } from 'styled-components';

const IcnCancel = ({ lineColor, circleColor, width = 26.87, height = 26.87 }) => {
    const theme = useTheme();
    const reflectLineColor = lineColor ? lineColor : theme.TEXT_LIGHT_COLOR;
    const reflectCircleColor = circleColor ? circleColor : theme.MAIN_THEME_COLOR;

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 26.87 26.87">
            <g id="그룹_3717" data-name="그룹 3717" transform="translate(0 13.435) rotate(-45)">
                <g id="타원_172" data-name="타원 172" transform="translate(0)" fill={reflectCircleColor} stroke={reflectCircleColor} strokeWidth="2">
                    <circle cx="9.5" cy="9.5" r="9.5" stroke="none" />
                    <circle cx="9.5" cy="9.5" r="8.5" fill="none" />
                </g>
                <g id="그룹_3043" data-name="그룹 3043" transform="translate(4.162 4.061)">
                    <line id="선_2858" data-name="선 2858" x2="10.355" transform="translate(0 5.279)" fill="none" stroke={reflectLineColor} strokeLinecap="round" strokeWidth="2" />
                    <line id="선_2859" data-name="선 2859" y2="10.559" transform="translate(5.178)" fill="none" stroke={reflectLineColor} strokeLinecap="round" strokeWidth="2" />
                </g>
            </g>
        </svg>
    );
};

export default IcnCancel;
