import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import SmsIcon from "@mui/icons-material/Sms";
import DownloadIcon from "@mui/icons-material/Download";
import { Tabs, AppBar, Toolbar } from "@mui/material";
import axios from "axios";
import Mobile from "./Mobile";
import { styled, useTheme } from "@mui/material/styles";
import MailIcon from "@mui/icons-material/Mail";
import SyncIcon from "@mui/icons-material/Sync";
import PersonIcon from "@mui/icons-material/Person";
// import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Paper,
  Typography,
  Button,
  Grid,
  Box,
  List,
  ListItem,
  Container,
  Avatar,
} from "@mui/material";
import { Whatshot } from "@mui/icons-material";
import Stage from "./Stage";

const Tab = styled(Container)(({ theme }) => ({
  textAlign: "center",
  borderRadius: "15px",
}));

const texts1 = ["Lottery", "Original", "Slots"];
const texts2 = ["Sports", "Popular", "Casino"];
const texts3 = ["Rummy", "Fishing"];

const circleStyle = {
  width: 60,
  height: 60,
  borderRadius: "50%",
  backgroundColor: "#3498db", // Default background color
  margin: "0",
};

const imageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "100%",
};

const UserInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1),
  background: "linear-gradient(to top,#fbc02d, #ffecb3)",
  borderRadius: "10px",
  marginTop: theme.spacing(1),
  justifyContent: "space-between",
}));

const initialWinners = [
  {
    txt: "Mem***GII",
    image: "/assets/Pro1.png",
    amount: "₹112.00",
    image1: "/assets/card1.png",
  },
  {
    txt: "Mem***WFU",
    image: "/assets/Pro2.png",
    amount: "₹1,000.00",
    image1: "/assets/card2.png",
  },
  {
    txt: "Mem***ZJQ",
    image: "/assets/Pro3.png",
    amount: "₹482.00",
    image1: "/assets/card4.png",
  },
  {
    txt: "Mem***DYK",
    image: "/assets/Pro4.png",
    amount: "₹400.00",
    image1: "/assets/card5.png",
  },
  {
    txt: "Mem***LSU",
    image: "/assets/Pro5.png",
    amount: "₹800.00",
    image1: "/assets/card6.png",
  },
];

const Home = ({ children }) => {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    window.addEventListener("resize", setVh);
    setVh();

    return () => window.removeEventListener("resize", setVh);
  }, []);

  const images = [
    {
      id: 2,
      src: "/assets/Banner7.png",
      alt: "Second Image",
    },
    {
      id: 3,
      src: "/assets/Banner8.png",
      alt: "Third Image",
    },
    {
      id: 3,
      src: "/assets/Banner9.png",
      alt: "Third Image",
    },
    {
      id: 3,
      src: "/assets/Banner10.png",
      alt: "Third Image",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleAviatorClick = async () => {
    try {
      console.log("Clicked");
      const response = await axios.post(
        "http://localhost:4000/redirect-to-second-website",
        {},
        {
          withCredentials: true,
        }
      );
      console.log("response--->", response);
      // Assuming response.ok is equivalent to a successful response (status in 200-299 range)
      if (response.status) {
        console.log("status-->", response.status);
        // Open the redirectUrl in a new window/tab
        window.open(response.data.redirectUrl, "_blank");
      } else {
        console.error("Registration/Login failed:", response.data.error);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const gameData = [
    {
      id: 1,
      title: "Win Go 1Min",
      imgSrc: "/assets/lotterycategory_20240110062051do1k.png",
      game: "Win Go",
      path: "/head",
    },
    {
      id: 2,
      title: "Win Go 3Min",
      imgSrc: "/assets/lotterycategory_20240110062051do1k.png",
      game: "Win Go",
      path: "/head",
    },
    {
      id: 3,
      title: "Win Go 5Min",
      imgSrc: "/assets/lotterycategory_20240110062051do1k.png",
      game: "Win Go",
      path: "/head",
    },
    {
      id: 4,
      title: "Win Go 10Min",
      imgSrc: "/assets/lotterycategory_20240110062051do1k.png",
      game: "Win Go",
      path: "/head",
    },
    {
      id: 5,
      title: "K3 1Min",
      imgSrc: "/assets/lotterycategory_20240110062111bt8e.png",
      game: "K3",
      path: "/k3",
    },
    {
      id: 6,
      title: "K3 3Min",
      imgSrc: "/assets/lotterycategory_20240110062111bt8e.png",
      game: "K3",
      path: "/k3",
    },
    {
      id: 7,
      title: "K3 5Min",
      imgSrc: "/assets/lotterycategory_20240110062111bt8e.png",
      game: "K3",
      path: "/k3",
    },
    {
      id: 8,
      title: "K3 10Min",
      imgSrc: "/assets/lotterycategory_20240110062111bt8e.png",
      game: "K3",
      path: "/k3",
    },
    {
      id: 9,
      title: "TRX 1Min",
      imgSrc: "/assets/lotterycategory_20240110062124qut6.png",
      game: "Trx Win",
      path: "/trx",
    },
    {
      id: 10,
      title: "TRX 3Min",
      imgSrc: "/assets/lotterycategory_20240110062124qut6.png",
      game: "Trx Win",
      path: "/trx",
    },
    {
      id: 11,
      title: "TRX 5Min",
      imgSrc: "/assets/lotterycategory_20240110062124qut6.png",
      game: "Trx Win",
      path: "/trx",
    },
    {
      id: 12,
      title: "TRX 10Min",
      imgSrc: "/assets/lotterycategory_20240110062124qut6.png",
      game: "Trx Win",
      path: "/trx",
    },
  ];

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [activeTab, setActiveTab] = useState(0); // Add this line
  const [winners, setWinners] = useState(initialWinners);
  const [activeItem, setActiveItem] = useState("Win Go");

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const filteredGameData =
    activeItem === "All"
      ? gameData
      : gameData.filter((game) => game.title.includes(activeItem));

  const StyledPaper = styled(Paper)(({ theme }) => ({
    transition: "transform 0.5s ease-in-out",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }));
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `https://111club.online/abclottery.apk`; // Change this to the actual path of the APK file on your server
    link.download = "abclottery.apk";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds

    // Cleanup function to clear the timeout if the component unmounts before 2 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Mobile>
        {isLoading && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9999,
            }}
          ></div>
        )}
        <Box
          display="flex"
          flexDirection="column"
          height="calc(var(--vh, 1vh) * 100)"
          position="relative"
          sx={{
            backgroundColor: "#242424", // Base background color
            overflowY: "scroll",
            overflowX: "hidden",
            "&::-webkit-scrollbar": {
              width: "1px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#242424",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#242424",
            },
          }}
        >
          <Box flexGrow={1} sx={{ backgroundColor: "#242424" }}>
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              sx={{
                position: "sticky",
                top: 0,
                zIndex: 1000,
                backgroundColor: "#3f3f3f",
                padding: "8px 16px",
                color: "white",
              }}
            >
              <Grid item xs={6} textAlign="left">
                <img
                  src="assets/logo.png"
                  alt="logo"
                  style={{ width: "100px", height: "30px" }}
                />
              </Grid>
              <Grid item xs={6} textAlign="right">
                <IconButton
                  style={{ color: "white" }}
                  onClick={() => console.log("Navigate to messages")}
                >
                  <SmsIcon />
                </IconButton>
                <IconButton style={{ color: "white" }} onClick={handleDownload}>
                  <DownloadIcon />
                </IconButton>
              </Grid>
            </Grid>

            {/* //content */}

            <Grid item xs={12} style={{ display: "flex" }}>
              {images.map((image, index) => (
                <Paper
                  key={image.id}
                  sx={{
                    display: index === currentIndex ? "block" : "none",
                    width: "100%",
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    style={{ width: "100%", height: "auto", margin: 0 }}
                  />
                </Paper>
              ))}
            </Grid>

            <Grid
              container
              alignItems="center"
              sx={{ backgroundColor: "#242424" }}
            >
              <Grid item xs={2} align="left">
                <IconButton>
                  <VolumeUpIcon sx={{ color: "#d9ac4f" }} />
                </IconButton>
              </Grid>
              <Grid item xs={6} align="left">
                <div
                  style={{
                    overflow: "hidden",
                    height: "24px",
                    position: "relative",
                  }}
                >
                  <Typography
                    variant="caption"
                    style={{
                      position: "absolute",
                      color: "white",
                      fontSize: "8px",
                    }}
                  >
                    For your convenience to ensure the safety of your account
                    and successful withdrawal process. Please fill the genuine
                    mobile active number register in your bank account. thanks
                    for your cooperation
                    <br />
                    Welcome to 91 CLUB! We have a variety of g ames, promos and
                    bonus for you to enjoy,
                  </Typography>
                </div>
              </Grid>

              <Grid
                item
                xs={4}
                sx={{ flexGrow: 1, maxWidth: 600, margin: "auto", padding: 1 }}
              >
                <Button
                  variant="contained"
                  startIcon={<Whatshot />}
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    borderRadius: "10px",
                    backgroundImage:
                      "linear-gradient(to right, #f6dc88, #dbaf53)",
                    color: "#211f2e",
                  }}
                >
                  Details
                </Button>
              </Grid>
            </Grid>

            <Box
              sx={{ flexGrow: 1, maxWidth: 600, margin: "auto", padding: 1 }}
            >
              <UserInfo>
                <Typography
                  color="black"
                  sx={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <PersonIcon />
                  MemberNNGLYQF5-₹0.00
                  <SyncIcon />
                </Typography>
                <MailIcon />
              </UserInfo>
            </Box>

            <Box display="flex" mx={2} mt={1} mb={-0.8}>
              <Tab>
                <Box
                  display="flex"
                  mx={1}
                  mt={1}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 8,
                    mt: 1,
                    justifyContent: "center",
                  }}
                >
                  {[...Array(3).keys()].map((index) => (
                    <Button
                      key={index}
                      sx={{
                        position: "relative",
                        padding: 1,
                        background: "none",
                      }}
                    >
                      <div>
                        <img
                          src="/assets/bg1.png"
                          alt="Main"
                          height={120}
                          width={120}
                        />
                        <Typography
                          style={{
                            position: "absolute",
                            top: "75%",
                            left: "70%",
                            transform: "translate(-80%, -50%)",
                            color: "#3e2723",
                            fontSize: "15px",
                            fontWeight: "bold",
                          }}
                        >
                          {texts1[index]}
                        </Typography>
                      </div>
                      <img
                        src={`/assets/lottery${index + 1}.png`}
                        alt={`Tab ${index + 1}`}
                        height={100}
                        width={100}
                        style={{ position: "absolute", bottom: "35%" }}
                      />
                    </Button>
                  ))}
                </Box>
                <Box display="flex" mx={2} mt={1}>
                  <Grid container spacing={1}>
                    <div
                      style={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src="/assets/bg3.png"
                        alt="Main"
                        style={{
                          display: "block",
                          margin: "auto",
                          width: "128%",
                          height: "110%",
                          marginLeft: "10px",
                        }}
                      />
                      <Grid
                        container
                        spacing={2}
                        justifyContent="space-between"
                        style={{
                          position: "absolute",
                          top: 60,

                          width: "120%",
                          height: "100%",
                          alignItems: "center",
                        }}
                      >
                        {[...Array(3).keys()].map((index) => (
                          <Grid item key={index} xs={4}>
                            <Box
                              sx={{
                                textAlign: "center",
                                position: "relative",
                                top: `${index * 33.3}%`,
                                transform: "translateY(-50%)",
                              }}
                            >
                              <Button
                                sx={{ background: "none", marginBottom: "2px" }}
                              >
                                {" "}
                                {/* Added marginBottom for spacing */}
                                <img
                                  src={`/assets/gamecategory${index + 1}.png`}
                                  alt={`Category ${index + 1}`}
                                  height={80}
                                  width={90}
                                  style={{ borderRadius: "10px" }}
                                />
                              </Button>
                              <Typography
                                sx={{
                                  marginTop: "2px", // Added marginTop for spacing
                                  color: "#3e2723",
                                  fontSize: "15px",
                                  fontWeight: "bold",
                                }}
                              >
                                {texts2[index]}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </div>
                  </Grid>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 8,
                    justifyContent: "center",
                  }}
                >
                  {[...Array(2).keys()].map((index) => (
                    <Button
                      key={index}
                      sx={{
                        position: "relative",
                        padding: 4,
                        background: "none",
                      }}
                    >
                      <div>
                        <img
                          src="/assets/bg2.png"
                          alt="Main"
                          height={100}
                          width={185}
                        />
                        <Typography
                          style={{
                            position: "absolute",
                            top: "40%",
                            marginTop: "5px",
                            color: "#3e2723",
                            left: "65%",
                            fontsize: "15px",
                            fontWeight: "bold",
                          }}
                        >
                          {texts3[index]}
                        </Typography>
                      </div>
                      <img
                        src={`/assets/third${index + 1}.png`}
                        alt={`Tab ${index + 1}`}
                        height={90}
                        width={100}
                        style={{
                          position: "absolute",
                          bottom: "20",
                          marginRight: "70px",
                        }}
                      />
                    </Button>
                  ))}
                </Box>
              </Tab>
            </Box>

            <Box
              sx={{ flexGrow: 1, maxWidth: 600, margin: "auto", padding: 1 }}
            >
              <Typography
                variant="h5"
                color="#d9ac4e"
                fontFamily="bahnschrift"
                fontWeight="bold"
                textAlign="left"
                marginBottom="5px"
              >
                | Lottery
              </Typography>
              <Box
                sx={{
                  background: "#3A3A3A",
                  color: "#a6a9ae",
                  overflowX: "auto",
                  overflowY: "hidden",
                  width: "25rem",
                  height: "3.5rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box
                  component="ul"
                  sx={{
                    width: "100%",
                    fontSize: 0,
                    whiteSpace: "nowrap",
                    padding: 2,
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    listStyle: "none",
                  }}
                >
                  {["All", "Win Go", "K3", "TRX", "Aviator"].map(
                    (item, index) => (
                      <Box
                        component="li"
                        key={index}
                        sx={{
                          display: "inline-block",
                          padding: "0 1rem",
                          fontWeight: 500,
                          fontSize: "1rem",
                          textAlign: "center",
                          borderRadius: "0.9rem",
                          background:
                            item === activeItem
                              ? "linear-gradient(to bottom, #f5e1a1, #d5aa57)"
                              : "transparent",
                          color: item === activeItem ? "#3A3A3A" : "#a6a9ae",
                          margin: "0 .5rem",
                          lineHeight: "3.5rem",
                          cursor: "pointer",
                        }}
                        className={item === activeItem ? "active" : ""}
                        onClick={() => handleItemClick(item)}
                      >
                        {item}
                      </Box>
                    )
                  )}
                </Box>
              </Box>
            </Box>

            <Box
              sx={{ flexGrow: 1, maxWidth: 600, margin: "auto", padding: 1 }}
            >
              <Box sx={{ padding: "10px" }}>
                <Grid container spacing={1}>
                  {filteredGameData.map((game) => (
                    <Grid item xs={4} sm={4} md={4} key={game.id}>
                      <Link to={game.path} style={{ textDecoration: "none" }}>
                        <Box
                          sx={{
                            position: "relative",
                            borderRadius: "8px",
                            textAlign: "center",
                            cursor: "pointer",
                          }}
                        >
                          <img
                            src={game.imgSrc}
                            alt={game.title}
                            style={{
                              width: "100%",
                              height: "auto",
                              borderRadius: "8px",
                            }}
                          />
                          <Typography
                            variant="subtitle1"
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              width: "100%",
                              padding: "8px 0",
                              color: "#ffee69",
                              fontWeight: "bold",
                              fontSize: "13px",
                              backgroundColor: "rgba(0, 0, 0, 0.5)",
                              borderBottomLeftRadius: "8px",
                              borderBottomRightRadius: "8px",
                            }}
                          >
                            {game.title}
                          </Typography>
                        </Box>
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>

            <Box sx={{ maxWidth: 600, margin: "auto", padding: 1 }}>
              <Typography
                variant="h5"
                color="#d9ac4e"
                fontFamily=" bahnschrift"
                fontWeight="bold"
                textAlign="left"
              >
                | Winning Information
              </Typography>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "5px",
                  marginRight: "5px",
                  marginTop: "20px",
                  marginBottom: "10px",
                }}
              >
                <Grid
                  container
                  spacing={{ xs: 1, md: 2 }}
                  columns={{ xs: 1, sm: 1, md: 1 }}
                >
                  {winners.map((winner, index) => (
                    <Grid item xs={12} key={index}>
                      <StyledPaper
                        sx={{ backgroundColor: "#3a3a3a", padding: 1 }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {/* Winner Image and Text */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <img
                              src={winner.image}
                              alt=""
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                border: "0.5px solid white",
                                margin: 2,
                              }}
                            />
                            <Typography
                              sx={{ color: "#a7a9af", fontSize: "13px" }}
                            >
                              {winner.txt}
                            </Typography>
                          </Box>

                          {/* Spacer to push the next section to the right */}
                          <Box sx={{ flexGrow: 1 }} />

                          {/* Winner Details */}
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <img
                              src={winner.image1}
                              alt=""
                              style={{
                                width: "70px",
                                height: "45px",
                                borderRadius: "10px",
                                background:
                                  "linear-gradient(to right, #ff8a80, #ffccbc)",
                              }}
                            />
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                textAlign: "left",
                              }}
                            >
                              <Typography
                                sx={{
                                  color: "#ead796",
                                  fontSize: "12px",
                                  fontWeight: "bold",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                Receive {winner.amount}
                              </Typography>
                              <Typography
                                sx={{
                                  color: "#adafc5",
                                  fontSize: "12px",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                Winning Amount
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </StyledPaper>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ maxWidth: 600, margin: "auto", padding: 1 }}>
              <Typography
                variant="h5"
                color="#d9ac4e"
                fontFamily=" bahnschrift"
                fontWeight="bold"
                textAlign="left"
              >
                | Today's Earning Chart
              </Typography>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "left",
                  marginLeft: "5px",
                  marginRight: "5px",
                  marginTop: "120px",
                  marginBottom: "200px",
                }}
              >
                <Stage />
              </Grid>
            </Box>

            <br />
            {/* content end */}
          </Box>

          {children}
        </Box>
      </Mobile>
    </div>
  );
};

export default Home;
