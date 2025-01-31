import React, { useEffect} from 'react'
import Mobile from '../Components/Mobile';
import IconButton from '@mui/material/IconButton';
import SmsIcon from '@mui/icons-material/Sms';
import DownloadIcon from '@mui/icons-material/Download';
import { Typography,  Card, CardMedia, CardContent,Grid , Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';


const ActivityMain= ({ children }) => {

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', setVh);
    setVh();

    return () => window.removeEventListener('resize', setVh);
  }, []);
  const navigate = useNavigate();
  const navigateToPage2 = () => {
    navigate('/coupen-user'); // Replace '/path-to-page' with the actual path
  };
  const navigateToPage3 = () => {
    navigate('/attendance'); // Replace '/path-to-page' with the actual path
  };
 

  const handleDownload = () => {
    // Programmatically click the hidden anchor tag
    const link = document.createElement('a');
    link.href = `https://111club.online/abclottery.apk`; // Change this to the actual path of the APK file on your server
    link.download = 'abclottery.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div>
      <Mobile>
        <Box
          display="flex"
          flexDirection="column"
          height="calc(var(--vh, 1vh) * 100)"
          position="relative"
        >
          <Box flexGrow={1} sx={{backgroundColor: 'rgb(34,39,91)'}}>


            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              sx={{
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                backgroundColor: 'Rgb(55,72,146)',
                padding: '8px 16px',
                color: 'white'
                
              }}
            >
              <Grid item xs={6} textAlign="left">
                <span style={{ fontWeight: "bold" }}>Activity</span>
              </Grid>
              <Grid item xs={6} textAlign="right">
              <IconButton color="inherit" onClick={() => navigate('/messages')}>
  <SmsIcon />
</IconButton>
<IconButton style={{color:"white"}} onClick={handleDownload}>
        <DownloadIcon />
      </IconButton>
              </Grid>
            </Grid>

            {/* //content */}

            <Grid mt={2} container spacing={2}    sx={{    marginLeft: '3px',
                marginRight: 'auto', width:"95%", }}>
      <Grid item xs={6}>
        <Card  onClick={navigateToPage2}>
          <CardMedia
            component="img"
            height="140"
            image="assets/images/signInBanner-33f86d3f.png"
            alt="Image 1"
          />
          <CardContent sx={{backgroundColor:"rgb(50,58,124)"}}>
            <Typography variant="caption" component="div" sx={{color:"white",fontWeight:"bold"}}  >
              Gifts
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{color:"white"}}  >
            Enter the redemption code to receive gift rewards
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card  onClick={navigateToPage3}>
          <CardMedia
            component="img"
            height="140"
            image="assets/images/giftRedeem-45917887.png"
            alt="Image 2"
          />
          <CardContent sx={{backgroundColor:"rgb(50,58,124)"}}>
            <Typography variant="caption" component="div" sx={{color:"white",fontWeight:"bold"}} >
            Attendance bonus
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{color:"white"}}>
            The more consecutive days you sign in, the higher the reward will 
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>



     <Grid mt={2} container spacing={2} sx={{   marginLeft: '3px',
                marginRight: 'auto', width:"95%", marginBottom:"150px"}}>
      <Grid item xs={12} >
        <Card>
          <CardMedia
            component="img"
            height="140"
            image="assets/images/activity.jpg"
            alt="Image 1"
          />
          <CardContent sx={{backgroundColor:"rgb(50,58,124)"}}>
            <Typography variant="caption" component="div" sx={{color:"white",fontWeight:"bold"}} >
            TC GAMES AVIATOR BONUS BONANZA
            </Typography>
           
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} >
        <Card>
          <CardMedia
            component="img"
            height="140"
            image="assets/images/activity2.jpg"
            alt="Image 2"
          />
          <CardContent sx={{backgroundColor:"rgb(50,58,124)"}}>
            <Typography variant="caption" component="div" sx={{fontWeight:"bold",color:"white"}} >
            GET 2% EVERYDAY
            </Typography>
          
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} >
        <Card>
          <CardMedia
            component="img"
            height="140"
            image="assets/images/activity3.jpg"
            alt="Image 3"
          />
          <CardContent sx={{backgroundColor:"rgb(50,58,124)"}}>
            <Typography variant="caption" component="div" sx={{color:"white",fontWeight:"bold"}} >
            WINSTREAK KRISHNA RANK
            </Typography>
            
          </CardContent>
        </Card>
      </Grid>
    </Grid> 
    
    
            {/* content end */}
          </Box>


          
{children}

        </Box>
      </Mobile>
    </div>
  )
}

export default ActivityMain;