import React from "react";
import { Link } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import logo from '../Assets/logo_encanto.png';
import mainImg from "../Assets/main_img.png"
import slider2 from "../Assets/slider2.png"
import slider3 from "../Assets/slider3.png"
import { Typography } from "@mui/material";
// import { useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper.min.css';
import 'swiper/modules/effect-fade/effect-fade.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import { EffectFade, Pagination } from 'swiper';
import '../Styles/Home.css';


export default function Home() {

    return (

        <React.Fragment>
            <CssBaseline/>
                <Container maxWidth="sm">

                    <Box sx={{display:'flex' }} alignItems="center" justifyContent="center">
                        <Stack spacing={-3} justifyContent="center" alignItems="center">
                            <img className="logo" src={logo} alt="logo" style={{
                                width: '240px',
                                height: '240px',

                            }}></img>
                        </Stack>
                    </Box>

                    <Box alignItems="center" justifyContent="center">
                        <Swiper
                        modules={[EffectFade, Pagination]}
                        centeredSlides={true}
                        effect
                        speed={800}
                        slidesPerView={1}
                        loop
                        className='myswiper'
                        pagination={{
                            dynamicBullets: true,
                        }}
                        >
                        <SwiperSlide>
                            <img className="logo" src={mainImg} alt="logo" style={{
                                width: '230px',
                                height: '230px',
                            }}></img>
                        </SwiperSlide> 
                        <SwiperSlide>
                            <img className="logo" src={slider2} alt="logo" style={{
                                width: '230px',
                                height: '230px',
                            }}></img>
                        </SwiperSlide> 
                        <SwiperSlide>
                            <img className="logo" src={slider3} alt="logo" style={{
                                width: '230px',
                                height: '230px',
                            }}></img>
                        </SwiperSlide>
                        </Swiper>
                    </Box>

                    <Box alignItems="center" justifyContent="center">
                        <Stack spacing={3} justifyContent="center" alignItems="center">
                            <Typography variant="h5" sx={{
                                mt: 6,
                                textAlign: "center",
                                fontFamily: "Signika Negative",
                                fontWeight:'bold',
                                fontSize: '28px'
                                }}> More than just food
                            </Typography>
                            <Typography variant="h5" sx={{ 
                                mt: 6,
                                textAlign: "center",
                                fontWeight:'bold',
                                fontFamily: "Signika Negative", color: "#A08C8C", 
                                }}> Connect with People who are craving for the same food
                            </Typography>
                        </Stack>
                    </Box>

                    <Box sx={{display:'flex' }} alignItems="center" justifyContent="center">
                        <Stack sx={{mt: 6}}  spacing={2} justifyContent="center" alignItems="center">
                            <Link to={`/signup`} style={{ textDecoration: 'none' }}>
                                <Button className="signup-button" variant='contained' sx={{
                                    bgcolor: '#CA502B',
                                    width: '25vh',
                                    borderRadius:'30px',
                                    fontWeight:'bold'}}>sign up</Button>
                            </Link>  
                            <Link to={`/login`} style={{ textDecoration: 'none' }}>
                                <Button className="login-button" variant='contained' sx={{
                                    bgcolor: '#1D3251',
                                    width: '25vh',
                                    borderRadius:'30px',
                                    fontWeight:'bold'}}>Log in</Button> 
                            </Link>
                        </Stack>

                    </Box>
                </Container>  
        </React.Fragment>   
    )

}