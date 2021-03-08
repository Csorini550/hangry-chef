import React, { useState } from 'react'
import { Fab, TextField, TextareaAutosize, Grid } from '@material-ui/core'
import { ArrowBack, GetApp } from '@material-ui/icons'
import { Link } from "react-router-dom";
import QRcode from 'qrcode.react'
import { useSelector, useDispatch } from 'react-redux';
import "./CreateQrCode.css"
function CreateQrCode() {
    const loggedInUser = useSelector(state => {
        return state.session.user;
    })
    const userId = loggedInUser.id
    const [qr, setQr] = useState(`https://hangrychef.herokuapp.com/${userId}`);
    const handleChange = (event) => {
        setQr(event.target.value);
    };
    const downloadQR = () => {
        const canvas = document.getElementById("myqr");
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "myqr.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <div className="big-div">
            <div className="container">
                <Link to={`/${userId}`}>
                    <Fab style={{ marginRight: 10 }} color="primary">
                        <ArrowBack />
                    </Fab>
                </Link>
                <span>Home</span>

                <div style={{ marginTop: 30 }}>
                    <TextField onChange={handleChange} style={{ width: 320 }}
                        value={qr} label="QR content" size="large" variant="outlined" color="primary"
                    />
                </div>

                <div>
                    {
                        qr ?
                            <QRcode
                                id="myqr"
                                value={qr}
                                size={320}
                                includeMargin={true}
                            /> :
                            <p>No QR code preview</p>
                    }
                </div>
                <div>
                    {
                        qr ?
                            <Grid container>
                                <Grid item xs={10}>
                                    <TextareaAutosize
                                        style={{ fontSize: 18, width: 250, height: 100 }}
                                        rowsMax={4}
                                        defaultValue={qr}
                                        value={qr}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Fab onClick={downloadQR} style={{ marginLeft: 10 }} color="primary">
                                        <GetApp />
                                    </Fab>
                                </Grid>
                            </Grid> :
                            ''
                    }
                </div>
            </div>
        </div>
    );
}

export default CreateQrCode;