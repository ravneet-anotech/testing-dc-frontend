import React, { useState, useEffect, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import Mobile from "../Components/Mobile";
import {
  Typography,
  Grid,
  Box,
  TableBody,
  TableCell,
  TableRow,
  Table,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TableContainer,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { styled } from "@mui/system";
import NoteIcon from "@mui/icons-material/Note";
import { domain } from "../Components/config";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import { Button } from "@mui/material";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Refresh, AccountBalanceWallet, VolumeUp } from "@mui/icons-material";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import {
  Tabs,
  Tab,
  Divider,
  Pagination,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import { Drawer } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";

import "../App.css";
import "./style.css";
import CheckIcon from "@mui/icons-material/Check";
import { Paper } from "@mui/material";
import axios from "axios";
import { wssdomain } from "../Components/config";
const countdownSound = new Audio("/assets/sound.mp3");
countdownSound.loop = true;

const images = [
  {
    id: 1,
    src: "games/assets/time-5d4e96a3.png",
    altSrc: "games/assets/time_a-07f92409.png",
    subtitle: "K3 Lottery 1Min",
  },
  {
    id: 2,
    src: "games/assets/time-5d4e96a3.png",
    altSrc: "games/assets/time_a-07f92409.png",
    subtitle: "K3 Lottery 3Min",
  },
  {
    id: 3,
    src: "games/assets/time-5d4e96a3.png",
    altSrc: "games/assets/time_a-07f92409.png",
    subtitle: "K3 Lottery 5Min",
  },
  {
    id: 4,
    src: "games/assets/time-5d4e96a3.png",
    altSrc: "games/assets/time_a-07f92409.png",
    subtitle: "K3 Lottery 10Min",
  },
];

const columns = [
  { id: "period", label: "Period" },
  { id: "sum", label: "Sum" },
  { id: "diceOutcome", label: "Results" },
];

const TabPanel = ({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && <Box p={1}>{children}</Box>}
    </div>
  );
};
const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    backgroundColor: "#201D2B",
    maxWidth: "320px", // Adjust the maxWidth as needed
    width: "100%",
    maxHeight: "450px", // Adjust the maxHeight as needed
    height: "auto",
    color: "white",
    display: "flex",
    flexDirection: "column",

    textAlign: "center",
    overflowY: "auto",
    borderRadius: "5%", // Enable vertical scrollbar if needed
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  justifyContent: "center",
  alignItems: "center",
  padding: "15px",
  backgroundColor: "#2AA1F3",
  color: "white",
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: "18px",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#2B3270",
  color: "white",
}));
const CustomPagination = styled(Pagination)({
  '& .MuiPaginationItem-root': {
    color: '#A8A5A1',
  },
  '& .MuiPaginationItem-page.Mui-selected': {
  
    color: '#A8A5A1',
  },
  '& .MuiPaginationItem-ellipsis': {
    color: '#D9AC4F',
    backgroundColor: '##D9AC4F',
  },
  '& .MuiPaginationItem-previousNext': {
    backgroundColor: '#D9AC4F',
    color: '#8F5206',
    padding: '3px',
    width: 'auto',  // Ensure it doesn't stretch
    height: 'auto', // Ensure it doesn't stretch
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '& .MuiPaginationItem-icon': {
    width: '70px', // Adjust the size to make it square
    height: '40px', // Adjust the size to make it square
  },
});

const CustomTable = ({ data }) => {
  const pageSize = 10;
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(data.length / pageSize);
  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };

  const paginatedData = data.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-evenly"
      borderRadius="25px"
      color="white"
    >
      <Grid
        container
        item
        direction="row"
        justifyContent="space-evenly"
        backgroundColor="#3A3947"
      >
        {columns.map((column) => (
          <Grid
            item
            xs={column.id === "diceOutcome" ? 4 : 2}
            key={column.id}
            sx={{
              color: "white",
              height: 50,
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              fontSize: "1rem",
            }}
          >
            {column.label}
          </Grid>
        ))}
      </Grid>
      <Divider />
      <Grid container direction="row"  justifyContent="space-evenly" backgroundColor="#333332">
      {paginatedData.map((row) => (
        <Grid
          container
          item
          direction="row"
          alignItems="center"
          justifyContent="center"
          key={row.id}
          borderBottom= "1px solid #ccc"
         padding="8px"
         
        >
          <Grid item xs={2}>
            {"**" + row.periodId.slice(-7, -2)}
          </Grid>
          <Grid item xs={2}>
            {row.totalSum}
          </Grid>
          <Grid item xs={2}>
            {row.size}
          </Grid>
          <Grid item xs={2}>
            {row.parity}
          </Grid>
          <Grid item xs={4}>
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              {row.diceOutcome.map((outcome, index) => {
                const src = `games/assets/num${outcome}.png`;
                // console.log(src);
                return (
                  <img
                    key={index}
                    src={src}
                    alt={`Dice ${outcome}`}
                    width="20"
                    height="20"
                    style={{ margin: "3px" }}
                  />
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      ))}
</Grid>
      <Grid
        item
        xs={12}
        sx={{
          backgroundColor: "#333332",
          color: "grey",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <CustomPagination
          count={totalPages}
          page={page + 1}
          onChange={handleChangePage}
        />
      </Grid>
</Grid>
  );
};

// const RowVisualization = ({ data }) => {
//   const [numRows, setNumRows] = useState(10);

//   const handleLoadMore = () => {
//     console.log('Load More button clicked');
//     setNumRows(numRows + 10);
//   };

//   const displayData = data.slice(0, numRows);

//   const getBackgroundColor = (number) => {
//     if ([2, 4, 6, 8].includes(number)) {
//       return 'red';
//     } else if ([1, 3, 5, 9].includes(number)) {
//       return ' #006400';
//     } else if (number === 0) {
//       return 'linear-gradient(to bottom, red 50%, purple 50%)';
//     } else if (number === 7) {
//       return 'linear-gradient(to right, #006400 50%, purple 50%)';
//     } else {
//       return 'transparent';
//     }
//   };

//   return (
//     <Box style={{ backgroundColor: "white", borderRadius: "25px", padding: "10px" }}>
//       {displayData.map((row, rowIndex) => (
//         <Box key={row.id} sx={{ display: 'flex', flexDirection: 'row', margin: '30px 0', position: 'relative' }}>
//           <Box sx={{ width: '70px', fontSize: "14px" }}>
//             {row.period.slice(0, -2)}
//           </Box>
//           {Array.from({ length: 10 }).map((_, circleIndex) => {
//             const backgroundColor = circleIndex === Number(row.number) ? getBackgroundColor(Number(row.number)) : 'transparent';
//             return (
//               <Box
//                 key={circleIndex}
//                 sx={{
//                   width: '20px',
//                   height: '20px',
//                   borderRadius: '50%',
//                   border: '1px solid grey',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   position: 'relative',
//                   margin: '0 4px',
//                   background: backgroundColor,
//                   color: circleIndex === Number(row.number) ? 'white' : 'grey'
//                 }}
//               >
//                 {circleIndex}
//               </Box>
//             );
//           })}
//           <Box sx={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
//             <Typography variant="body2" sx={{ backgroundColor: row.size === 'B' ? 'orange' : 'skyblue', borderRadius: "50%", p: "3px" }}>
//               {row.size === 'B' ? 'B' : 'S'}
//             </Typography>
//           </Box>
//           {rowIndex < data.length - 1 && (
//             <svg style={{ position: 'absolute', top: 0, left: '48px', right: 0, bottom: 0, pointerEvents: 'none' }}>
//               <path
//                 d={`M${(Number(row.number) * 30 + 15)} 20 Q ${(Number(row.number) + Number(data[rowIndex + 1].number)) * 15 + 15} 40 ${(Number(data[rowIndex + 1].number) * 30 + 15)} 55`}
//                 stroke="red"
//                 fill="transparent"
//               />
//             </svg>
//           )}
//         </Box>
//       ))}
//       <Button variant="contained" color="primary" onClick={handleLoadMore}>
//         Load More
//       </Button>
//     </Box>
//   );
// };
const CustomPage = styled(Pagination)({
  "& .MuiPaginationItem-root": {
    color: "white",
  },
  "& .MuiPaginationItem-page.Mui-selected": {
    color: "white",
  },
  "& .MuiPaginationItem-ellipsis": {
    color: "white",
    backgroundColor: "skyblue",
  },
  "& .MuiPaginationItem-previousNext": {
    backgroundColor: "skyblue",
    color: "white",
    padding: "3px",
    width: "auto", // Ensure it doesn't stretch
    height: "auto", // Ensure it doesn't stretch
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  "& .MuiPaginationItem-icon": {
    width: "70px", // Adjust the size to make it square
    height: "40px", // Adjust the size to make it square
  },
});

const RowVisualization = ({ data }) => {
  const getOutcomeDescription = (outcome) => {
    const uniqueNumbers = [...new Set(outcome)];
    if (uniqueNumbers.length === 1) {
      return "3 same numbers";
    } else if (uniqueNumbers.length === 2) {
      return "2 same numbers";
    } else if (uniqueNumbers.length === 3) {
      const sortedOutcome = [...outcome].sort();
      if (
        sortedOutcome[2] - sortedOutcome[1] === 1 &&
        sortedOutcome[1] - sortedOutcome[0] === 1
      ) {
        return "3 consecutive numbers";
      } else {
        return "3 different numbers";
      }
    }
  };

  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };

  const paginatedData = data.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );
  return (
    <div
      style={{
        backgroundColor: "#333332",
        borderRadius: "10px",
        color: "white",
        padding: "10px",
      }}
    >
      {/* Header Row */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          fontWeight: "bold",
          backgroundColor: "#3A3947",
          color: "white",
          height: "40px",
          alignItems: "center",
          padding: "0 10px",
        }}
      >
        <div style={{ width: "100px", fontSize: "16px" }}>Period</div>
        <div style={{ width: "200px", fontSize: "16px" }}>Results</div>
        <div style={{ width: "200px", fontSize: "16px" }}>Number</div>
      </div>
      {/* Render Data Rows */}
      {paginatedData.map((row) => (
        <div
          key={row.id}
          style={{
            display: "flex",
            flexDirection: "row",
            margin: "20px 0",
            alignItems: "center",
            padding: "0 10px",
          }}
        >
          <div style={{ width: "100px", fontSize: "14px" }}>
            {row.periodId.slice(0, -2)}
          </div>
          <div style={{ width: "200px", fontSize: "14px" }}>
            {row.diceOutcome.map((outcome, index) => {
              const src = `games/assets/num${outcome}.png`;
              return (
                <img
                  key={index}
                  src={src}
                  alt={`Dice ${outcome}`}
                  width="20"
                  height="20"
                  style={{ marginRight: "5px" }}
                />
              );
            })}
          </div>
          <div style={{ width: "200px", fontSize: "13px" }}>
            {getOutcomeDescription(row.diceOutcome)}
          </div>
        </div>
      ))}
      {/* Load More Pagination */}
      <Grid
        item
        xs={12}
        sx={{
          backgroundColor: "#333332",
          color: "grey",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <CustomPagination
          count={totalPages}
          page={page + 1}
          onChange={handleChangePage}
        />
      </Grid>
    </div>
  );
};

const LotteryAppk = () => {
  const [activeId, setActiveId] = useState(images[0].id);
  const [selectedTimer, setSelectedTimer] = useState("1Min");
  const [selectedItem, setselectedItem] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [timer, setTimer] = useState(60); // 60 seconds = 1 minute
  const [rows, setRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [winner, setWinner] = useState(null);
  const [betPlaced, setBetPlaced] = useState(false);
  const [periodId, setPeriodId] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [wallet, setWallet] = useState(0);

  const handleDialog = () => {
    setOpen1(!open1);
  };

  useEffect(() => {
    axios
      .get("user-balance", { withCredentials: true })
      .then((response) => {
        setWallet(response.data.walletAmount);
      })
      .catch((error) => {
        console.error("Error fetching Wallet:", error);
        setError("Error fetching Wallet");
      });
  }, []);

  useEffect(() => {
    const socket = new WebSocket(`${wssdomain}`); // Connect to WebSocket server

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data && data.timers && data.timers[selectedTimer]) {
        setPeriodId(data.timers[selectedTimer].periodId); // Set the periodId
        setRemainingTime(data.timers[selectedTimer].remainingTime); // Set the remainingTime
      } else {
        console.error("Unexpected data structure", data);
      }
    };

    return () => socket.close(); // Cleanup WebSocket connection
  }, [selectedTimer]);
  const handleClick = (id) => {
    let timerKey;
    switch (id) {
      case 1:
        timerKey = "1min";
        break;
      case 2:
        timerKey = "3min";
        break;
      case 3:
        timerKey = "5min";
        break;
      case 4:
        timerKey = "10min";
        break;
      default:
        timerKey = "1min";
    }

    setSelectedTimer(timerKey);
    setActiveId(id);
  };

  const textArray = [
    "ATTENTION TC ! Live chats are available on our apps/website",
    "Second message",
    "Third message",
  ];

  const [index, setIndex] = React.useState(0);
  const [inProp, setInProp] = React.useState(false);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setInProp(false);

      setTimeout(() => {
        setIndex((oldIndex) => {
          return (oldIndex + 1) % textArray.length;
        });
        setInProp(true);
      }, 500); // This should be equal to the exit duration below
    }, 3000); // Duration between changing texts

    return () => clearInterval(timer);
  }, []);

  //   table
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [totalSum, settotalSum] = useState("");
  const [betAmount, setBetAmount] = useState(1);
  const [bets, setBets] = useState([]);
  const [multiplier, setMultiplier] = useState(1);
  const [totalBet, setTotalBet] = useState(1);

  const [betPeriodId, setBetPeriodId] = useState(null);

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [gameResult, setGameResult] = useState("");

  const handleOpenDrawer = (item) => {
    settotalSum(item);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleBetAmount = (amount) => {
    setBetAmount(amount);
  };

  const handleMultiplier = (multiplier) => {
    setMultiplier(multiplier);
  };

  const handleTotalBet = () => {
    setTotalBet(betAmount * multiplier);
  };

  const handlePlaceBet = async () => {
    // Fetch sdata
    console.log("clicked here");
    axios
      .get("user-balance", { withCredentials: true })
      .then((response) => {
        setWallet(response.data.walletAmount);
      })
      .catch((error) => {
        console.error("Error fetching Wallet:", error);
        setError("Error fetching Wallet");
      });
    const totalBet = betAmount * multiplier;

    // Check if user's wallet balance is less than the total bet amount
    if (wallet < totalBet) {
      alert("You don't have enough balance to place this bet.");
      return;
    } else {
      const betData = {
        [selectedItem]: totalSum,
        betAmount: betAmount,
        multiplier: multiplier,
        totalBet: totalBet,
        selectedTimer: selectedTimer,
        periodId: periodId,
        selectedItem: selectedItem,
        status: " ",
        winLoss: "",
      };
      setLastAlertedPeriodId(betData.periodId);
      console.log(betData);
      axios
        .post(`${domain}/K3betgame`, betData, { withCredentials: true })
        .then((response) => {
          setBetPlaced(true);
          setBetPeriodId(periodId);
          handleCloseDrawer();
          setOpenSnackbar(true);
        })
        .catch((error) => {
          console.log("Error fetching:", error);
          setError("Error fetching");
        });
    }
  };

  const handleCancelBet = () => {
    settotalSum("");
    setBetAmount(1);
    setMultiplier(1);
    setTotalBet(1);
    handleCloseDrawer();
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  useEffect(() => {
    handleClick(images[0].id);
  }, []);

  // Inside your Head component

  const countdownSound = new Audio("/path/to/sound.mp3"); // Replace with your sound file path
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sdata, setSdata] = useState([]);
  const [sdata1, setSdata1] = useState([]);
  const [lastAlertedPeriodId, setLastAlertedPeriodId] = useState(null);
  const [filteredData1, setFilteredData1] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [user, setUser] = useState(null);
  const [winloss, setWinLoss] = useState(0);
  const [popupperiod, setPopupPeriod] = useState(0);
  const [pop, setpop] = useState(0);
  const [popupperiodid, setPopupPeriodId] = useState("");
  const [popupTimer, setPopupTimer] = useState(0);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${domain}/user`, {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserData();
  }, [user]);

  useEffect(
    () => {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`${domain}/k3gameresult`, {
            withCredentials: true,
          });
          // console.log("response=====>",response.data)

          // Filter the data based on the selectedTimer
          setSdata(response.data.results);
          setSdata1(response.data.results);
        } catch (err) {
          console.error(err);
        }
      };
      fetchUserData();
      const intervalId = setInterval(fetchUserData, 0);
      return () => clearInterval(intervalId);
    },
    [selectedTimer],
    sdata,
    sdata1
  );
  useEffect(() => {
    const filtered = sdata
      .filter((item) => item.timerName === selectedTimer)
      .sort((a, b) => b.timestamp - a.timestamp); // Adjust the sorting key as needed
    setFilteredData(filtered);

    const filtered1 = sdata1
      .filter((item) => item.timerName === selectedTimer)
      .sort((a, b) => b.timestamp - a.timestamp); // Adjust the sorting key as needed
    setFilteredData1(filtered1);
  }, [sdata, sdata1, selectedTimer]); // Add dependencies here

  useEffect(() => {
    const socket = new WebSocket(`${wssdomain}/`);
    socket.onopen = () => {
      console.log("Connected to WebSocket server");
    };
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data && data.timers && data.timers[selectedTimer]) {
        setPeriodId(data.timers[selectedTimer].periodId); // Set the periodId
        setRemainingTime(data.timers[selectedTimer].remainingTime); // Set the remainingTime
      } else {
        console.error("Unexpected data structure", data);
      }
    };
    return () => socket.close(); // Cleanup WebSocket connection
  }, [selectedTimer]);

  const [res, setRes] = useState([]);

  const timeParts = (remainingTime || "00:00").split(":");
  const minutes = timeParts[0] || "00";
  const seconds = timeParts[1] || "00";
  const [lastPlayedTime, setLastPlayedTime] = useState(null);
  const [isSoundOn, setIsSoundOn] = useState(false);

  useEffect(() => {
    if (["00:05","00:04","00:03", "00:02", "00:01"].includes(remainingTime)) {
      setOpenDialog(true);
      if (isSoundOn && remainingTime !== lastPlayedTime) {
        countdownSound.play();
        setLastPlayedTime(remainingTime);
        setTimeout(() => {
          countdownSound.pause();
          countdownSound.currentTime = 0;
        }, 1000 - countdownSound.duration * 1000);
      }
    } else if (remainingTime === "00:00") {
      setOpenDialog(false);
      if (isSoundOn) {
        countdownSound.pause();
        countdownSound.currentTime = 0;
        setLastPlayedTime(null);
      }
    }
  }, [remainingTime, isSoundOn]);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${domain}/user/K3history/`,
          { withCredentials: true }
        );
        setBets(response.data);
        let latestBet = response.data[response.data.length-1];
        if (latestBet.periodId == lastAlertedPeriodId) {
            if (latestBet.status === "Failed") {
              setOpen(true);
              setDialogContent("You lost the bet");
              setGameResult(latestBet.status);
              setWinLoss(latestBet.winLoss);
              setPopupPeriod(latestBet[selectedItem]);
              setRes(latestBet.diceOutcome)
              setpop(latestBet.selectedItem);
              setPopupPeriodId(String(latestBet.periodId));
              setPopupTimer(latestBet.selectedTimer);
              setLastAlertedPeriodId(null);
            } else if (latestBet.status === "Succeed") {
              setOpen(true);
              setDialogContent("Bonus");
             setGameResult(latestBet.status);
              setWinLoss(latestBet.winLoss);
              setPopupPeriod(latestBet[selectedItem]);
              setRes(latestBet.diceOutcome)
              setpop(latestBet.selectedItem);
              setPopupPeriodId(lastAlertedPeriodId);
              setPopupTimer(latestBet.selectedTimer);
              setLastAlertedPeriodId(null);
            }
        }else{
          console.log("Latest bet periodId is not the same as the last alerted periodId");
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserData();
    const intervalId = setInterval(fetchUserData, 1000);
    return () => clearInterval(intervalId);
  }, [periodId,remainingTime,betPlaced]);
  // useEffect(() => {
  //   if (open) {
  //     const timer = setTimeout(() => {
  //       setBetPlaced(false);
  //       setOpen(false);
  //     }, 2000);

  //     // Cleanup the timeout if the component unmounts or boxOpened changes
  //     return () => clearTimeout(timer);
  //   }
  // }, [open, betPlaced]);

  const [selectedColor, setSelectedColor] = useState(" RGB(71,129,255)");
  const handleEventSelection = (event) => {
    // ... your existing code ...

    switch (event) {
      case "violet":
        setSelectedColor("RGB(182,89,254)");
        break;
      case "green":
        setSelectedColor("RGB(64,173,114)");
        break;
      case "red":
        setSelectedColor("RGB(253,86,92)");
        break;
      case "yellow":
        setSelectedColor(" RGB(71,129,255)");
        break;
      case "blue":
        setSelectedColor("RGB(253,86,92)");
        break;
      default:
        setSelectedColor(" RGB(71,129,255)");
    }
  };

  const [activeButton, setActiveButton] = useState(1);
  const [activeBetAmount, setActiveBetAmount] = useState(1);

  const [values, setValues] = useState(0);
  const handleChanges = (event, newValue) => {
    setValues(newValue);
  };
  const navigate = useNavigate();

  const navigateToPage = () => {
    navigate("/"); // Replace '/path-to-page' with the actual path
  };

  const navigateToPage1 = () => {
    navigate("/recharge"); // Replace '/path-to-page' with the actual path
  };

  const navigateToPage2 = () => {
    navigate("/withdraw"); // Replace '/path-to-page' with the actual path
  };

  const renderTab1Content = () => {
    const redImage = "games/assets/redBall-fd34b99e.png";
    const greenImage = "games/assets/greenBall-b7685130.png";
    const images = [
      { src: greenImage, label: "3", factor: "207.36X", color: "green" },
      { src: redImage, label: "4", factor: "69.12X", color: "red" },
      { src: greenImage, label: "5", factor: "34.56X", color: "green" },
      { src: redImage, label: "6", factor: "23.04X", color: "red" },
      { src: greenImage, label: "7", factor: "17.28X", color: "green" },
      { src: redImage, label: "8", factor: "13.824X", color: "red" },
      { src: greenImage, label: "9", factor: "11.52X", color: "green" },
      { src: redImage, label: "10", factor: "9.6X", color: "red" },
      { src: greenImage, label: "11", factor: "8.192X", color: "green" },
      { src: redImage, label: "12", factor: "6.912X", color: "red" },
      { src: greenImage, label: "13", factor: "5.76X", color: "green" },
      { src: redImage, label: "14", factor: "4.608X", color: "red" },
      { src: greenImage, label: "15", factor: "3.84X", color: "green" },
      { src: redImage, label: "16", factor: "3.072X", color: "red" },
      { src: greenImage, label: "17", factor: "2.304X", color: "green" },
      { src: redImage, label: "18", factor: "1.92X", color: "red" },
      // ...
    ];

    return (
      <Grid
        container
        spacing={4}
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        {images.map((image, index) => (
          <Grid item key={index}>
            <Box
              position="relative"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 50,
              }}
              onClick={() => {
                handleOpenDrawer(image.label);
                handleEventSelection("green");
                setselectedItem("totalSum");
              }}
            >
              <Box
                component="img"
                src={image.color === "green" ? greenImage : redImage}
                alt={`Image ${index + 1}`}
                width={50}
                height={50}
              />
              <Box
                sx={{
                  position: "absolute",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: image.color,
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                {image.label}
              </Box>
            </Box>
            <Typography variant="body2" align="center" color="#927992">
              {image.factor}
            </Typography>
          </Grid>
        ))}

        <Grid container style={{ justifyContent: "center" }}>
          <Grid
            item
            onClick={() => {
              handleOpenDrawer("Big");
              handleEventSelection("green");
              setselectedItem("size");
            }}
            style={{
              width: 70,
              height: 50,
              backgroundColor: " RGB(71,129,255)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              marginRight: 8,
              marginLeft: 35,
              borderRadius: "5px",
            }}
          >
            <Typography variant="body1">Big</Typography>
            <Typography variant="body2" style={{ marginTop: 4 }}>
              1.92X
            </Typography>
          </Grid>

          <Grid
            item
            onClick={() => {
              handleOpenDrawer("Small");
              handleEventSelection("green");
              setselectedItem("size");
            }}
            style={{
              width: 70,
              height: 50,
              backgroundColor: "RGB(113,168,241)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              marginRight: 8,
              borderRadius: "5px",
            }}
          >
            <Typography variant="body1">Small</Typography>
            <Typography variant="body2" style={{ marginTop: 4 }}>
              1.92X
            </Typography>
          </Grid>

          <Grid
            item
            onClick={() => {
              handleOpenDrawer("Odd");
              handleEventSelection("green");
              setselectedItem("size");
            }}
            style={{
              width: 70,
              height: 50,
              backgroundColor: "RGB(246,89,76)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              marginRight: 8,
              borderRadius: "5px",
            }}
          >
            <Typography variant="body1">Odd</Typography>
            <Typography variant="body2" style={{ marginTop: 4 }}>
              1.92X
            </Typography>
          </Grid>

          <Grid
            item
            onClick={() => {
              handleOpenDrawer("Even");
              handleEventSelection("green");
              setselectedItem("size");
            }}
            style={{
              width: 70,
              height: 50,
              backgroundColor: "RGB(71,172,118)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              borderRadius: "5px",
            }}
          >
            <Typography variant="body1">Even</Typography>
            <Typography variant="body2" style={{ marginTop: 4 }}>
              1.92X
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const renderTab2Content = () => {
    const data = [
      {
        label: "2 matching numbers: odds(13.83)",
        values: [
          [1, 1],
          [2, 2],
          [3, 3],
          [4, 4],
          [5, 5],
          [6, 6],
        ],
      },
      {
        label: "A pair of unique numbers: odds(69.12)",
        values: [
          [1, 1],
          [2, 2],
          [3, 3],
          [4, 4],
          [5, 5],
          [6, 6],
        ],
      },
      { label: "", values: [1, 2, 3, 4, 5, 6] },
    ];
    return (
      <>
        {data.map((item, index) => (
          <div key={index} sx={{ marginTop: "5px" }}>
            <Typography variant="body1" color="white" align="left">
              {item.label}
            </Typography>
            <Grid container spacing={1} justifyContent="center">
              {item.values.map((value, valueIndex) => (
                <Grid item key={valueIndex}>
                  <Paper
                    elevation={3}
                    sx={{
                      bgcolor:
                        index === 0
                          ? "#633DA6"
                          : index === 1
                          ? "#7E3554"
                          : "#217267",
                      p: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minWidth: 30,
                      minHeight: 30,
                      color: "#8E8DB5",
                      marginTop: "5px",
                    }}
                    onClick={() => {
                      handleOpenDrawer(value);
                      handleEventSelection("green");
                      setselectedItem("twoSameOneDifferent");
                    }}
                  >
                    <Typography variant="body1">{value}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </div>
        ))}
      </>
    );
  };

  const renderTab3Content = () => {
    const data = [
      {
        label: "3 of the same number: odds(207.36)",
        values: [
          [1, 1, 1],
          [2, 2, 2],
          [3, 3, 3],
          [4, 4, 4],
          [5, 5, 5],
          [6, 6, 6],
        ],
      },
      {
        label: "Any 3 of the same number: odds(34.56)",
        value: "Any 3 of the same number: odds",
      },
    ];
    return (
      <>
        {data.map((item, index) => (
          <div key={index} sx={{ mt: 2 }}>
            <Typography variant="body1" align="left" color="white">
              {item.label}
            </Typography>
            {Array.isArray(item.values) ? (
              <Grid container spacing={1} justifyContent="center">
                {item.values.map((value, valueIndex) => (
                  <Grid item key={valueIndex}>
                    <Paper
                      elevation={3}
                      sx={{
                        bgcolor: selectedNumbers1.includes(value)
                          ? "#9B48DB"
                          : "#633DA6",
                        p: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minWidth: 30,
                        minHeight: 30,
                        color: selectedNumbers1.includes(value)
                          ? "white"
                          : "#8E8DB5",
                        marginTop: "5px",
                      }}
                      onClick={() => {
                        handleOpenDrawer(value);
                        handleEventSelection("white");
                        setselectedItem("threeSame");
                      }}
                    >
                      <Typography variant="body1">{value}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Paper
                elevation={3}
                sx={{
                  bgcolor: "#7E3554",
                  p: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#8E8DB5",
                  marginTop: "5px",
                }}
                onClick={() => {
                  handleOpenDrawer(item.value);
                  handleEventSelection("white");
                  setselectedItem("threeSame");
                }}
              >
                <Typography variant="body1">{item.value}</Typography>
              </Paper>
            )}
          </div>
        ))}
      </>
    );
  };

  const renderTab4Content = () => {
    const values = [1, 2, 3, 4, 5, 6];
    return (
      <>
        <Typography variant="body1" align="left" color="white" gutterBottom>
          3 different numbers: odds(34.56)
        </Typography>
        <Grid container spacing={1}>
          {values.map((value, index) => (
            <Grid item key={index}>
              <Box
                sx={{
                  bgcolor: selectedNumbers1.includes(value)
                    ? "#9B48DB"
                    : "#633DA6",
                  borderRadius: "4px",
                  p: 1,
                  color: selectedNumbers1.includes(value) ? "white" : "#927992",
                  minWidth: "35px",
                  textAlign: "center",
                  position: "relative",
                }}
                onClick={() => handleNumberClick(value)}
              >
                {value}
                {selectedNumbers1.includes(value) && (
                  <CheckIcon
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      color: "#9B48DB",
                      backgroundColor: "white",
                      borderRadius: "50%",
                      fontSize: "12px",
                    }}
                  />
                )}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box my={2}>
          <Typography variant="body1" align="left" color="white" gutterBottom>
            3 continuous numbers: odds(8.64)
          </Typography>
          <Box
            sx={{
              bgcolor: "#7E3554",
              borderRadius: "4px",
              p: 1,
              textAlign: "center",
              color: "#9497B7",
            }}
            onClick={() => {
              handleOpenDrawer("3 continuous numbers");
              handleEventSelection("green");
              setselectedItem("threeDifferentNumbers");
            }}
          >
            3 continuous numbers
          </Box>
        </Box>

        <Typography variant="body1" align="left" color="white" gutterBottom>
          2 different numbers: odds(6.91)
        </Typography>
        <Grid container spacing={1}>
          {values.map((value, index) => (
            <Grid item key={index}>
              <Box
                sx={{
                  bgcolor: selectedNumbers2.includes(value)
                    ? "#9B48DB"
                    : "#633DA6",
                  borderRadius: "4px",
                  p: 1,
                  color: selectedNumbers2.includes(value) ? "white" : "#9497B7",
                  minWidth: "35px",
                  textAlign: "center",
                  position: "relative",
                }}
                onClick={() => handleNumberClick2(value)}
              >
                {value}
                {selectedNumbers2.includes(value) && (
                  <CheckIcon
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      color: "#9B48DB",
                      backgroundColor: "white",
                      borderRadius: "50%",
                    }}
                  />
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </>
    );
  };

  const diceOne = "games/assets/num1.png";
  const diceTwo = "games/assets/num2.png";
  const diceThree = "games/assets/num3.png";
  const diceFour = "games/assets/num4.png";
  const diceFive = "games/assets/num5.png";
  const diceSix = "games/assets/num6.png";

  // Array of dice face images
  const diceImages = [diceOne, diceTwo, diceThree, diceFour, diceFive, diceSix];
  const [rolling, setRolling] = useState(false);
  const [diceFaces, setDiceFaces] = useState([1, 1, 1]);
  const rollInterval = useRef(null);

  const rollDice = (diceOutcome) => {
    setRolling(true);
    // Clear any existing interval
    if (rollInterval.current) {
      clearInterval(rollInterval.current);
    }
    const firstRow = filteredData.length > 0 ? filteredData[0] : null;
    // Roll the dice with random numbers for 3 seconds
    rollInterval.current = setInterval(() => {
      setDiceFaces([
        Math.ceil(Math.random() * 6),
        Math.ceil(Math.random() * 6),
        Math.ceil(Math.random() * 6),
      ]);
    }, 0);

    // After 3 seconds, set the dice faces to the dice outcomes from the results and stop rolling
    setTimeout(() => {
      clearInterval(rollInterval.current);
      if (firstRow.diceOutcome) {
        setDiceFaces(firstRow.diceOutcome);
      }
      setRolling(false);
    }, 4000);
  };

  useEffect(() => {
    // Simulating timer remaining state
    const timerRemainingMs = remainingTime; // Convert seconds to milliseconds
    if (timerRemainingMs === "00:03") {
      rollDice(); // Example outcome, you can change this to any outcome or remove the argument to keep random faces
    }
  }, [remainingTime]);
  // const lastRow = sdata[sdata.length - 1]
  // useEffect(()=>{

  //   console.log(lastRow)
  // })

  const [selectedNumbers1, setSelectedNumbers1] = useState([]);
  const [selectedNumbers2, setSelectedNumbers2] = useState([]);

  const handleNumberClick = (value) => {
    if (selectedNumbers1.length < 3) {
      setSelectedNumbers1([...selectedNumbers1, value]);
    } else {
      handleOpenDrawer(selectedNumbers1.join(""));
      handleEventSelection("green");
      setselectedItem("threeDifferentNumbers");
      setSelectedNumbers1([]);
    }
  };

  const handleNumberClick2 = (value) => {
    if (selectedNumbers2.length < 2) {
      setSelectedNumbers2([...selectedNumbers2, value]);
    } else {
      handleOpenDrawer(selectedNumbers2.join(""));
      handleEventSelection("green");
      setselectedItem("threeDifferentNumbers");
      setSelectedNumbers2([]);
    }
  };

  return (
    <div>
    <Mobile>
      <div style={{backgroundColor:"#242424"}}>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: "#3F3F3F",
          padding: "8px 16px",
          color: "white",
        }}
      >
        <Grid item xs={6} textAlign="left">
          <IconButton color="inherit" onClick={navigateToPage}>
            <ArrowBackIcon />
          </IconButton>
        </Grid>
        <Grid item xs={6} textAlign="right">
          <IconButton color="inherit">
            <SupportAgentIcon />
          </IconButton>
       
<IconButton color="inherit" onClick={() => setIsSoundOn(!isSoundOn)}>
{isSoundOn ? <MusicNoteIcon /> : <MusicOffIcon />}
</IconButton>
        </Grid>
      </Grid>

      <Grid
        container
        direction="column"
        sx={{
          height: "300px",
          backgroundColor: "#333332",
          borderRadius: "0 0 70px 70px",
          textAlign: "center",
        }}
      >
        <Grid
sx={{
  backgroundImage: `url("games/assets/walletbg-dcbd4124.png")`,
  backgroundSize: "cover",
  backgroundColor:"#4D4D4C",
  backgroundPosition: "center",
  margin: "0 20px 20px 20px",
  borderRadius: "30px",
  padding: "10px",
  marginTop: "10px",
}}
>
         
          <Grid
            sm={12}
            item
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color:"white"
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {wallet ? wallet : " Loading"}
            </Typography>
            <IconButton sx={{color:"white"}}>
              <Refresh />
            </IconButton>
          </Grid>

          <Grid
            sm={12}
            item
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color:"white"
            }}
          >
            <AccountBalanceWallet
              sx={{ marginRight: "10px", color: "#D9AC4F" }}
            />
            <Typography variant="subtitle2">Wallet Balance</Typography>
          </Grid>
          <Grid
            sm={12}
            mt={3}
            item
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              variant="outlined"
              onClick={navigateToPage2}
              fullWidth
              sx={{
                marginLeft: "10px",
                color: "white",
                backgroundColor:"#D23838",
                borderColor: "#D23838",
                borderRadius: "50px",
              }}
            >
              Withdraw
            </Button>
            <Button
              variant="contained"
              onClick={navigateToPage1}
              fullWidth
              sx={{
                marginLeft: "10px",
                backgroundColor: "#17B15E",
                borderRadius: "50px",
              }}
            >
              Deposit
            </Button>
          </Grid>
        </Grid>

        <Grid
          item
          sx={{
            backgroundColor: "#333332",
            margin: "0 20px 20px 20px",
            borderRadius: "3px",
            padding: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <IconButton>
            <VolumeUp sx={{ color: "#DEBA6D" }} />
          </IconButton>
          <CSSTransition
            in={inProp}
            timeout={500}
            classNames="message"
            unmountOnExit
          >
            <Typography variant="caption" sx={{ color: "white" }}>
              {textArray[index]}
            </Typography>
          </CSSTransition>

          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#DEBA6D",
              borderRadius: "50px",
              fontSize: "9px",
              paddingLeft: "12px",
              paddingRight: "12px",
              color:"#221F2E"
            }}
            startIcon={<WhatshotIcon />}
          >
            Details
          </Button>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={1}
        sx={{
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "95%",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          marginTop: "-50px",
          backgroundColor: "#4D4D4C",
          borderRadius: "30px",
          color:"white"
        }}
      >
        {images.map((image) => (
          <Grid
            item
            xs={3}
            key={image.id}
            onClick={() => handleClick(image.id)}
            style={{
              cursor: "pointer",
              border:
                activeId === image.id ? "1px solid #DAB465" : "none",
              backgroundColor:
                activeId === image.id ? "#DAB465" : "transparent",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // Align items horizontally
              justifyContent: "center", // Align items vertically
            }}
          >
            <img
              src={activeId === image.id ? image.altSrc : image.src}
              alt={image.subtitle}
              style={{ width: "80%" }}
            />
            <Typography variant="caption">{image.subtitle}</Typography>
          </Grid>
        ))}
      </Grid>

        <Box
          mt={2}
          sx={{
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "90%",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            p: 2,
            backgroundColor: "#333332",
            borderRadius: "30px",
          }}
        >
          <Grid container spacing={0} alignItems="center">
            <Grid item xs={2}>
              <Typography variant="body1" color="#9DA5A1">
                Period
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                sx={{
                  border: "1px solid #D9AC4F",
                  borderRadius: "10px",
                  padding: "4px 8px",
                  display: "inline-block",
                  color: "#D9AC4F",
                }}
                startIcon={<NoteIcon />}
                onClick={handleDialog}
              >
                How to play
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body5" color="#9DA5A1">
                Time Remaining
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={8}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "white", textAlign: "left" }}
              >
                {periodId ? periodId.slice(0, -2) : ""}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="h6"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Box
                  sx={{
                    display: "inline-block",
                    width: "16px",
                    height: "22px",
                    marginTop: "8px",
                    backgroundColor: "#4D4D4C",
                    color: "#D9AC4F",
                    textAlign: "center",
                    lineHeight: "20px",
                    margin: "0 2px",
                    borderRadius: "4px",
                    border: "1px solid #4D4D4C",
                  }}
                >
                  {minutes[0]}
                </Box>
                <Box
                  sx={{
                    display: "inline-block",
                    width: "16px",
                    height: "22px",
                    marginTop: "8px",
                    backgroundColor: "#4D4D4C",
                    color: "#D9AC4F",
                    textAlign: "center",
                    lineHeight: "20px",
                    margin: "0 2px",
                    borderRadius: "4px",
                    border: "1px solid #4D4D4C",
                  }}
                >
                  {minutes[1]}
                </Box>
                <Box
                  sx={{
                    display: "inline-block",
                    width: "16px",
                    height: "22px",
                    backgroundColor: "#4D4D4C",
                    color: "#D9AC4F",
                    marginTop: "8px",
                    
                    textAlign: "center",
                    lineHeight: "20px",
                    margin: "0 2px",
                    borderRadius: "4px",
                    border: "1px solid #4D4D4C",
                  }}
                >
                  :
                </Box>
                <Box
                  sx={{
                    display: "inline-block",
                    width: "16px",
                    height: "22px",
                    backgroundColor: "#4D4D4C",
                    color: "#D9AC4F",
                    marginTop: "8px",
                   
                    textAlign: "center",
                    lineHeight: "20px",
                    margin: "0 2px",
                    borderRadius: "4px",
                    border: "1px solid #4D4D4C",
                  }}
                >
                  {seconds[0]}
                </Box>
                <Box
                  sx={{
                    display: "inline-block",
                    width: "16px",
                    height: "22px",
                    backgroundColor: "#4D4D4C",
                    color: "#D9AC4F",
                    marginTop: "8px",
                    textAlign: "center",
                    lineHeight: "20px",
                    margin: "0 2px",
                    borderRadius: "4px",
                    border: "1px solid #4D4D4C",
                  }}
                >
                  {seconds[1]}
                </Box>
              </Typography>
            </Grid>
          </Grid>

          <>
            <div className="fullbox">
              <div id="leftbox"></div>
              <div className="outerbox">
                <div className="diebox">
                  <div className="dice-container">
                    {diceFaces.map((face, index) => (
                      <div key={index} className="dice-wrapper">
                        <img
                          src={diceImages[face - 1]}
                          alt={`Dice ${index + 1}`}
                          className={`dice-image ${rolling ? "rolling" : ""}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div id="rightbox"></div>
            </div>
          </>
          <Box mt={2}>
            <Tabs
              value={values}
              onChange={handleChanges}
              TabIndicatorProps={{ style: { display: "none" } }}
              variant="fullWidth"
            >
              <Tab
                label="Total"
                style={{
                  backgroundColor: values === 0 ? "#D9AC4F" : "#4D4D4C",
                  color: values === 0 ? "#8F5206" : "#889CA1",
                  borderBottom: values === 0 ? "none" : "",
                  borderRadius: values === 0 ? "10px" : "",
                  minWidth: "auto",
                }}
              />
              <Tab
                label="2 same"
                style={{
                  backgroundColor: values === 1 ? "#D9AC4F" : "#4D4D4C",
                  color: values === 1 ? "#8F5206" : "#889CA1",
                  borderBottom: values === 1 ? "none" : "",
                  borderRadius: values === 1 ? "10px" : "",
                  minWidth: "auto",
                }}
              />
              <Tab
                label="3 same"
                style={{
                  backgroundColor: values === 2 ? "#D9AC4F" : "#4D4D4C",
                  color: values === 2 ? "#8F5206" : "#889CA1",
                  borderBottom: values === 2 ? "none" : "",
                  borderRadius: values === 2 ? "10px" : "",
                  minWidth: "auto",
                }}
              />
              <Tab
                label="Different"
                style={{
                  backgroundColor: values === 3 ? "#D9AC4F" : "#4D4D4C",
                  color: values === 3 ? "#8F5206" : "#889CA1",
                  borderBottom: values === 3 ? "none" : "",
                  borderRadius: values === 3 ? "10px" : "",
                  minWidth: "auto",
                }}
              />
            </Tabs>
          </Box>
          <Box sx={{ mt: 2 }}>
            {values === 0 && renderTab1Content()}
            {values === 1 && renderTab2Content()}
            {values === 2 && renderTab3Content()}
            {values === 3 && renderTab4Content()}
          </Box>
        </Box>

        <Drawer anchor="bottom" open={drawerOpen} onClose={handleCloseDrawer}>
          <Grid container alignItems="center">
            <Grid
              item
              xs={12}
              align="center"
              style={{
                position: "relative",
                marginBottom: "20px",
                height: "100px",
                color: "white",
                backgroundColor: "transparent",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: selectedColor,
                  clipPath: "polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)",
                }}
              ></div>
              <div style={{ position: "relative" }}>
                <Typography variant="h6">{`K3 ${selectedTimer}`}</Typography>
                <Typography variant="h6">{selectedItem === "totalSum"
                                ? "Total"
                                : selectedItem === "threeDifferentNumbers"
                                ? "Different"
                                : selectedItem === "twoSameOneDifferent"
                                ? "2 Same"
                                : "3 Same"}</Typography>
                <Typography variant="body1">{`${totalSum} is selected`}</Typography>
              </div>
            </Grid>

            <Grid item xs={12}>
              <Grid container justifyContent="space-between">
                <Typography variant="h6">Balance</Typography>
                <Button
                  variant="contained"
                  style={{
                    borderRadius: 50,
                    backgroundColor:
                      activeBetAmount === 1 ? selectedColor : undefined,
                  }}
                  onClick={() => {
                    handleBetAmount(1);
                    setActiveBetAmount(1);
                  }}
                >
                  {"\u20B9" + "1"}
                </Button>
                <Button
                  variant="contained"
                  style={{
                    borderRadius: 50,
                    backgroundColor:
                      activeBetAmount === 10 ? selectedColor : undefined,
                  }}
                  onClick={() => {
                    handleBetAmount(10);
                    setActiveBetAmount(10);
                  }}
                >
                  {"\u20B9" + "10"}
                </Button>
                <Button
                  variant="contained"
                  style={{
                    borderRadius: 50,
                    backgroundColor:
                      activeBetAmount === 100 ? selectedColor : undefined,
                  }}
                  onClick={() => {
                    handleBetAmount(100);
                    setActiveBetAmount(100);
                  }}
                >
                  {"\u20B9" + "100"}
                </Button>
                <Button
                  variant="contained"
                  style={{
                    borderRadius: 50,
                    backgroundColor:
                      activeBetAmount === 1000 ? selectedColor : undefined,
                  }}
                  onClick={() => {
                    handleBetAmount(1000);
                    setActiveBetAmount(1000);
                  }}
                >
                  {"\u20B9" + "1000"}
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12} mt={2}>
              <Grid container>
                <Grid
                  item
                  container
                  direction="row"
                  justifyContent="space-between"
                  align="center"
                  alignItems="center"
                >
                  <Typography variant="h6">Quantity</Typography>
                  <div
                    className="button1"
                    onClick={() =>
                      setMultiplier(multiplier > 1 ? multiplier - 1 : 1)
                    }
                  >
                    -
                  </div>

                  <Typography
                    variant="body1"
                    style={{ border: "1px solid black", width: "50px" }}
                  >
                    {multiplier}
                  </Typography>
                  <div
                    className="button1"
                    onClick={() => setMultiplier(multiplier + 1)}
                  >
                    +
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} mt={2}>
              <Grid container justifyContent="flex-end">
                <div
                  className={`button ${activeButton === 1 ? "active" : ""}`}
                  onClick={() => {
                    handleMultiplier(1);
                    setActiveButton(1);
                  }}
                  style={
                    activeButton === 1 ? { backgroundColor: selectedColor } : {}
                  }
                >
                  X1
                </div>
                <div
                  className={`button ${activeButton === 5 ? "active" : ""}`}
                  onClick={() => {
                    handleMultiplier(5);
                    setActiveButton(5);
                  }}
                  style={
                    activeButton === 5 ? { backgroundColor: selectedColor } : {}
                  }
                >
                  X5
                </div>
                <div
                  className={`button ${activeButton === 10 ? "active" : ""}`}
                  onClick={() => {
                    handleMultiplier(10);
                    setActiveButton(10);
                  }}
                  style={
                    activeButton === 10
                      ? { backgroundColor: selectedColor }
                      : {}
                  }
                >
                  X10
                </div>
                <div
                  className={`button ${activeButton === 20 ? "active" : ""}`}
                  onClick={() => {
                    handleMultiplier(20);
                    setActiveButton(20);
                  }}
                  style={
                    activeButton === 20
                      ? { backgroundColor: selectedColor }
                      : {}
                  }
                >
                  X20
                </div>
                <div
                  className={`button ${activeButton === 50 ? "active" : ""}`}
                  onClick={() => {
                    handleMultiplier(50);
                    setActiveButton(50);
                  }}
                  style={
                    activeButton === 50
                      ? { backgroundColor: selectedColor }
                      : {}
                  }
                >
                  X50
                </div>
                <div
                  className={`button ${activeButton === 100 ? "active" : ""}`}
                  onClick={() => {
                    handleMultiplier(100);
                    setActiveButton(100);
                  }}
                  style={
                    activeButton === 100
                      ? { backgroundColor: selectedColor }
                      : {}
                  }
                >
                  X100
                </div>
              </Grid>
            </Grid>

            <Grid item xs={12} mt={2}>
              <Grid container justifyContent="space-around" spacing={0}>
                <Grid item xs={3}>
                  <Button
                    onClick={handleCancelBet}
                    fullWidth
                    style={{ backgroundColor: "black" }}
                    variant="contained"
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={9}>
                  <Button
                    onClick={handlePlaceBet}
                    fullWidth
                    style={{ background: selectedColor }}
                    variant="contained"
                  >{`Total Bet: ${betAmount * multiplier}`}</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Drawer>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={1000}
          onClose={handleCloseSnackbar}
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <MuiAlert
            onClose={handleCloseSnackbar}
            severity="success"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", color: "white" }}
          >
            Bet placed successfully!
          </MuiAlert>
        </Snackbar>

        <Dialog
          open={openDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: {
              width: "350px", // Set this to the desired size of your square
              height: "250px", // Set this to the same value as width
              backgroundColor: "rgba(0, 0, 0, 0.5)", // This sets the opacity of the dialog box background
              overflow: "hidden",
              borderRadius:"40px" // This removes the scrollbars
            },
          }}
        >
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              style={{
                textAlign: "center",
                fontSize: "120px",
                fontWeight: "bold",
                color: "#D9AC4F",
              }}
            >
              {remainingTime ? remainingTime.split(":")[1] : ""}
            </DialogContentText>
          </DialogContent>
        </Dialog>

        <Grid mt={2} sx={{ marginBottom: "10px" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="transparent"
            style={{
              marginLeft: "20px",
              marginBottom: "10px",
              paddingTop: "20px",
            }}
          >
             <Tab
      label="Game History"
      style={
        value === 0
          ? {
              backgroundColor: "#F6DF98",
              color: "#B66E06",
              borderRadius: "20px",
            }
          : { color: "##A8A5A1",backgroundColor:"#333332" }
      }
    />
    <Tab
      label="Chart"
      style={
        value === 1
          ? {
              backgroundColor: "#F6DF98",
              color: "#B66E06",
              borderRadius: "20px",
            }
          : { color: "#A8A5A1",backgroundColor:"#333332" }
      }
    />
    <Tab
      label="My History"
      style={
        value === 2
          ? {
              backgroundColor: "#F6DF98",
              color: "#B66E06",
              borderRadius: "20px",
            }
          : { color: "#A8A5A1",backgroundColor:"#333332" }
      }
    />
          </Tabs>
          <TabPanel value={value} index={0}>
            <CustomTable data={filteredData} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <RowVisualization data={filteredData1} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Grid container style={{ marginLeft: "0px" }}>
              {bets
                .slice()
                .sort((a, b) =>
                  b.timestamp && a.timestamp
                    ? -1
                    : b.timestamp.seconds - a.timestamp.seconds
                )
                .map((bet, index) => (
                  <Accordion sx={{backgroundColor:"#333332"}}>
                    <AccordionSummary
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      
                    >
                      <Grid
                        container
                        style={{
                          backgroundColor: "#242424",
                          marginTop: "10px",
                          padding: "18px",
                          width: "350px",
                        }}
                      >
                        <Grid item xs={3} sm={3}>
                          <Box
                            border={1}
                            borderRadius={2}
                            style={{
                              background:"#C5933B",
                              color: "#8F5206",
                              height: "40px",
                              width: "100px",
                              display: "flex",
                              border: "none",

                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              variant="body5"
                              sx={{ fontSize: "14px" }}
                            >
                              {bet.selectedItem === "totalSum"
                                ? "TOTAL"
                                : bet.selectedItem === "threeDifferentNumbers"
                                ? "DIFFERENT"
                                : bet.selectedItem === "twoSameOneDifferent"
                                ? "2 SAME"
                                : "3 SAME"}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xs={7}
                          sm={7}
                          style={{ textAlign: "center" }}
                        >
                          <Typography
                            variant="body1"
                            style={{
                              fontSize: "12px",
                              fontWeight: "bold",
                              color: "white",
                            }}
                          >
                            {String(bet.periodId).slice(0, -2)}
                          </Typography>
                          <Typography
                            variant="body1"
                            style={{ fontSize: "12px", color: "white" }}
                          >
                            {bet.timestamp
                              ? `${new Date(bet.timestamp).toLocaleDateString(
                                  "en-GB"
                                )}
                 ${new Date(bet.timestamp).toLocaleTimeString("en-GB")}`
                              : "N/A"}
                          </Typography>
                        </Grid>
                        <Grid item xs={2} sm={2}>
                          <Box
                            border={1}
                            borderRadius={1}
                            borderColor={bet.winLoss > 0 ? "green" : "red"}
                            sx={{
                              height: "20px",
                              width: "65px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              variant="body1"
                              style={{
                                color: bet.winLoss > 0 ? "green" : "red",
                              }}
                            >
                              {bet.status}
                            </Typography>
                          </Box>
                          <Typography
                            variant="body1"
                            style={{ color: bet.winLoss > 0 ? "green" : "red" }}
                          >
                            {bet.winLoss > 0
                              ? `+₹${bet.winLoss}`
                              : `₹${bet.winLoss}`}
                          </Typography>
                        </Grid>
                      </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                      <TableContainer>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell
                                style={{ fontWeight: "bold", color: "white" }}
                              >
                                Bet Amount
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "bold", color: "white" }}
                              >
                                {bet.betAmount}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                style={{ fontWeight: "bold", color: "white" }}
                              >
                                Multiplier
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "bold", color: "white" }}
                              >
                                {bet.multiplier}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                style={{ fontWeight: "bold", color: "white" }}
                              >
                                Total Bet
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "bold", color: "green" }}
                              >
                                {bet.totalBet}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                style={{ fontWeight: "bold", color: "white" }}
                              >
                                Tax
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "bold", color: "white" }}
                              >
                                {bet.tax}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                style={{ fontWeight: "bold", color: "white" }}
                              >
                                Fee
                              </TableCell>
                              <TableCell
                                style={{
                                  fontWeight: "bold",
                                  color: "red",
                                  color: "white",
                                }}
                              >
                                {bet.fee}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                style={{ fontWeight: "bold", color: "white" }}
                              >
                                Selected Timer
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "bold", color: "white" }}
                              >
                                {bet.selectedTimer}
                              </TableCell>
                            </TableRow>{" "}
                            <TableRow>
                              <TableCell
                                style={{ fontWeight: "bold", color: "white" }}
                              >
                                Your Selected Items:
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "bold", color: "white" }}
                              >
                                {Array.isArray(
                                  bet.selectedItem === "totalSum"
                                    ? bet.totalSum
                                    : bet.selectedItem ===
                                      "threeDifferentNumbers"
                                    ? bet.threeDifferentNumbers
                                    : bet.selectedItem === "twoSameOneDifferent"
                                    ? bet.twoSameOneDifferent
                                    : bet.selectedItem === "threeSame"
                                    ? bet.threeSame
                                    : []
                                )
                                  ? (bet.selectedItem === "totalSum"
                                      ? bet.totalSum
                                      : bet.selectedItem ===
                                        "threeDifferentNumbers"
                                      ? bet.threeDifferentNumbers
                                      : bet.selectedItem ===
                                        "twoSameOneDifferent"
                                      ? bet.twoSameOneDifferent
                                      : bet.selectedItem === "threeSame"
                                      ? bet.threeSame
                                      : []
                                    ).join(", ")
                                  : bet.selectedItem === "totalSum"
                                  ? bet.totalSum
                                  : bet.selectedItem === "threeDifferentNumbers"
                                  ? bet.threeDifferentNumbers
                                  : bet.selectedItem === "twoSameOneDifferent"
                                  ? bet.twoSameOneDifferent
                                  : bet.selectedItem === "threeSame"
                                  ? bet.threeSame
                                  : []}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                style={{ fontWeight: "bold", color: "white" }}
                              >
                                Result
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "bold", color: "white" }}
                              >
                                {Array.isArray(bet.diceOutcome)
                                  ? bet.diceOutcome.join(", ")
                                  : bet.diceOutcome}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                style={{ fontWeight: "bold", color: "white" }}
                              >
                                Winloss
                              </TableCell>
                              <TableCell
                                style={{
                                  fontWeight: "bold",
                                  color: bet.status === "win" ? "green" : "red",
                                }}
                              >
                                {bet.winLoss}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </AccordionDetails>
                  </Accordion>
                ))}
            </Grid>
          </TabPanel>
        </Grid>
        <>
          <StyledDialog
            open={open1}
            onClose={handleDialog}
            aria-labelledby="game-rules-dialog-title"
          >
            <StyledDialogTitle
              id="game-rules-dialog-title"
              justifyContent="center"
              alignItems="center"
            >
              How to play
            </StyledDialogTitle>
            <DialogContent>
              <DialogContentText
                sx={{
                  color: "white",
                  padding: "1px",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  fontSize: "14px",
                  textAlign: "left",
                }}
              >
                Fast3openwith3numbersineachperiod astheopeningnumber
                Theopeningnumbersare111to666 Naturalnumber .Nozerosinthearray
                Andtheopeningnumbersareinno particularorder
                Quick3istoguessallorpartof the3winningnumbers.
                <br />
                SumValue
                <br />
                Placeabetonthesumofthreenumbers
                <br />
                Choose3samenumberall
                <br />
                Forallthesamethreenumbers
                <br />
                Makeanall-inclusivebet
                <br />
                Choose3samenumbersingle
                <br />
                Fromallthesamethreenumbers
                <br />
                Chooseagroupofnumbersinanyofthemto placebets
                <br />
                Choose2SameMultiple
                <br />
                Placeabetontwodesignatedsamenumber sandanarbitrary
                numberamongthethreenumbers
                <br />
                Choose2SameSingle
                <br />
                Placeabetontwodesignatedsamenumbers andadesignated
                <br />
                differentnumberamongthethreenumbers
                <br />
                3numbersdifferent
              </DialogContentText>
            </DialogContent>
            <StyledDialogActions>
              <Button
                onClick={handleDialog}
                sx={{
                  color: "white",
                  backgroundColor: "#2986F2",
                  padding: "10px",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                  borderRadius: "20px",
                }}
              >
                Close
              </Button>
            </StyledDialogActions>
          </StyledDialog>
          {/* ...rest of the code... */}
          {/* <Dialog
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle style={{ textAlign: 'center' }}>
        {gameResult === 'won' ? 'Congratulations' : 'Sorry'}
      </DialogTitle>
      <DialogContent>
        <Card>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {dialogContent}
            </Typography>
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialog}>
          Close
        </Button>
      </DialogActions>
    </Dialog> */}
        </>

        <div
          style={{
            display: open ? "block" : "none",
            position: "absolute", // changed from fixed to absolute
            zIndex: 1,
            left: 0,
            top: "100px",
            width: "100%",
            height: "100%",
            overflow: "auto",
            border: "none",
          }}
        >
          <div
            style={{
              backgroundColor: "transparent",
              margin: "15% auto",
              padding: 20,
              width: "75%",
              height: "60%",
              backgroundImage: `url(${
                gameResult === "Failed"
                  ? "assets/images/missningLBg-73e02111.png"
                  : "assets/images/missningBg-6f17b242.png"
              })`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              style={{
                textAlign: "center",
                fontWeight: "bold",
                position: "absolute",
                marginTop: "-100px",
                color: "white",
              }}
            >
              {gameResult === "Failed" ? "Sorry" : "Congratulations"}
            </Typography>
            <br />
            <Typography
              variant="h6"
              style={{
                textAlign: "center",
                position: "absolute",
                marginTop: "-30px",
                color: "white",
              }}
            >
              Lottery results {Array.isArray(res) ? res.join(", ") : res}
            </Typography>

            <Typography
              sx={{
                marginTop: "150px",
                marginLeft: "50px",
                marginRight: "50px",
                fontWeight: "bold",
              }}
              variant="h5"
              color="text.secondary"
            >
              {dialogContent}
              <br />
              <span
                style={{ color: gameResult === "Failed" ? "red" : "green" }}
              >
                ₹{winloss}
              </span>
              <br />
              <span style={{ fontSize: "14px" }}>
                Period: {popupperiodid.slice(0, -2)}
              </span>
            </Typography>

            <Button
              sx={{
                marginTop: "380px",
                marginLeft: "50px",
                marginRight: "50px",
                position: "absolute",
              }}
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
        </div>
      </Mobile>
    </div>
  );
};

export default LotteryAppk;
