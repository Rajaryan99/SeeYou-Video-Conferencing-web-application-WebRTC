import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home'




// export default function History() {


//     const { getHistoryOfUser } = useContext(AuthContext);

//     const [meetings, setMeetings] = useState([])


//     const routeTo = useNavigate();

//     useEffect(() => {
//         const fetchHistory = async () => {
//             try {
//                 const history = await getHistoryOfUser();
//                 setMeetings(history);
//             } catch {
//                 // IMPLEMENT SNACKBAR
//             }
//         }

//         fetchHistory();
//     }, [getHistoryOfUser])

//     let formatDate = (dateString) => {

//         const date = new Date(dateString);
//         const day = date.getDate().toString().padStart(2, "0");
//         const month = (date.getMonth() + 1).toString().padStart(2, "0")
//         const year = date.getFullYear();

//         return `${day}/${month}/${year}`

//     }

//     return (
//         <div>

//             <IconButton onClick={() => {
//                 routeTo("/home")
//             }}>
//                 <HomeIcon />
//             </IconButton >
//             {
//                 (Array.isArray(meetings) &&     meetings.length !== 0) ? meetings.map((e, i) => {
//                     return (

//                         <>


//                             <Card key={i} variant="outlined">


//                                 <CardContent>
//                                     <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//                                         Code: {e.meetingCode}
//                                     </Typography>

//                                     <Typography sx={{ mb: 1.5 }} color="text.secondary">
//                                         Date: {formatDate(e.date)}
//                                     </Typography>

//                                 </CardContent>


//                             </Card>


//                         </>
//                     )
//                 }) : <> hey no data</>

//             }

//         </div>
//     )
// }


export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true);
    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                
                // CRITICAL DEBUG LOGS - Check your console!
                console.log("=== HISTORY DEBUG START ===");
                console.log("1. Raw history response:", history);
                console.log("2. Type of history:", typeof history);
                console.log("3. Is array?", Array.isArray(history));
                console.log("4. History value:", JSON.stringify(history, null, 2));
                
                if (history && typeof history === 'object' && !Array.isArray(history)) {
                    console.log("5. Object keys:", Object.keys(history));
                }
                
                // Handle different possible response formats
                let meetingsData = [];
                
                if (Array.isArray(history)) {
                    meetingsData = history;
                    console.log("6. Using history directly as array");
                } else if (history && Array.isArray(history.meetings)) {
                    meetingsData = history.meetings;
                    console.log("6. Using history.meetings");
                } else if (history && Array.isArray(history.data)) {
                    meetingsData = history.data;
                    console.log("6. Using history.data");
                } else {
                    console.log("6. No valid array found in response!");
                }
                
                console.log("7. Final meetings data:", meetingsData);
                console.log("8. Meetings length:", meetingsData.length);
                console.log("=== HISTORY DEBUG END ===");
                
                setMeetings(meetingsData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching history:", error);
                setLoading(false);
                // IMPLEMENT SNACKBAR
            }
        }

        fetchHistory();
    }, [getHistoryOfUser])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    return (
        <div>
            <IconButton onClick={() => routeTo("/home")}>
                <HomeIcon />
            </IconButton>

            {loading ? (
                <Typography sx={{ p: 2 }}>Loading history...</Typography>
            ) : Array.isArray(meetings) && meetings.length > 0 ? (
                meetings.map((e, i) => (
                    <Card key={i} variant="outlined" sx={{ mb: 2, mt: 2 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Code: {e.meetingCode}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Date: {formatDate(e.date)}
                            </Typography>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography sx={{ p: 2 }} color="text.secondary">
                    No meeting history available
                </Typography>
            )}
        </div>
    )
}