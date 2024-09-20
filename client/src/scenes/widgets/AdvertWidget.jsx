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
                src="https://friendsvault.s3.us-east-2.amazonaws.com/info4.jpeg"
                style={{ borderRadius: "0.75rem", margin: "0.75rem 0"}}
            />
            <FlexBetween>
                <Typography color={main}> GlowCosmetics</Typography>
                <Typography color={medium} >glowcosmetics.com</Typography>
            </FlexBetween>
            <Typography color={medium} m="0.5rem 0">
            Transform your life today with our revolutionary new product—experience the future of innovation now!
            </Typography>
        </WidgetWrapper>
    )
}

export default AdvertWidget;