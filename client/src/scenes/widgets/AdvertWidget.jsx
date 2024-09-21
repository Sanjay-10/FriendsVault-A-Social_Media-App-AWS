import { Typography, useTheme } from "@mui/material"; 
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
    const {palette} = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography color={dark} variant="h5" fontWeight="500">
                    Sponsored
                </Typography>
                <Typography color={medium} >
                    Create Ad
                </Typography>
            </FlexBetween>
            <img
                width = "100%"
                height= "auto"
                alt="Advert"
                src="https://friendsvault.s3.us-east-2.amazonaws.com/Owner/Ad.png"
                style={{ borderRadius: "0.75rem", margin: "0.75rem 0"}}
            />
            <FlexBetween>
                <Typography color={main}> Turbo-Drive</Typography>
                <Typography color={medium} >TurboDrive.com</Typography>
            </FlexBetween>
            <Typography color={medium} m="0.5rem 0">
            Drive into the future with the latest high-performance cars! Experience speed, luxury, and innovation like never before.
            </Typography>
        </WidgetWrapper>
    )
}

export default AdvertWidget;