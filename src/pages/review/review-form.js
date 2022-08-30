import React, { useState, useContext } from "react";
import {
  Avatar,
  Box,
  Grid,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import { pink } from "@mui/material/colors";
import {
  StyledAutocomplete,
  StyledButton,
  StyledPaper,
  StyledTextField,
} from "./styles-review";
import { database, storage } from "../../firebase";
import { ref, push, set } from "firebase/database";
import {
  getDownloadURL,
  uploadBytes,
  ref as storageRef,
} from "firebase/storage";
import { ThemeContext } from "../../App";

const REVIEW_FOLDER_NAME = "review";
const IMG_FOLDER_NAME = "reviewImages";
let postingRef = {};
let hawkerList = [];

const ReviewForm = () => {
  const [valueRating, setValueRating] = useState(2.5);
  const [satisfactionRating, setSatisfactionRating] = useState(2.5);
  const [fileInputFile, setFileInputFile] = useState(null);
  const [fileInputValue, setFileInputValue] = useState("");
  const [hawker, setHawker] = useState("");
  const [storeName, setStoreName] = useState("");
  const [dishName, setDishName] = useState("");
  const [review, setReview] = useState("");
  const { setTheme, theme } = useContext(ThemeContext);

  var jsonData = require("../../hawker-centres-kml.json");

  hawkerList = jsonData.map((hawkers) => {
    const names = hawkers.Name;
    return names;
  });

  const handleValueRatingChange = (e) => {
    e.preventDefault();
    setValueRating(e.target.value);
  };

  const handleSatisfactionRatingChange = (e) => {
    e.preventDefault();
    setSatisfactionRating(e.target.value);
  };

  const handleStoreNameChange = (e) => {
    setStoreName(e.target.value);
  };

  const handleDishNameChange = (e) => {
    setDishName(e.target.value);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleFileInputChange = (e) => {
    setFileInputFile(e.target.files[0]);
    setFileInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const imgFileRef = storageRef(
      storage,
      `${IMG_FOLDER_NAME}/${fileInputFile.name}`
    );

    uploadBytes(imgFileRef, fileInputFile).then(() => {
      getDownloadURL(imgFileRef).then((downloadURL) => {
        for (let i = 0; i < hawkerList.length; i += 1) {
          postingRef = ref(database, `${REVIEW_FOLDER_NAME}/${hawkerList[i]}`);
          const newPostingRef = push(postingRef);
          if (hawker === postingRef._path.pieces_[1]) {
            set(newPostingRef, {
              imageLink: downloadURL,
              hawker: hawker,
              review: review,
              storeName: storeName,
              DishName: dishName,
              valueRating: valueRating,
              satisfactionRating: satisfactionRating,
            });
          }
        }

        setReview("");
        setDishName("");
        setHawker("");
        setStoreName("");
        setHawker("");
        setFileInputValue("");
        setFileInputFile(null);
        setSatisfactionRating(2.5);
        setValueRating(2.5);
      });
    });
  };

  return (
    <Grid>
      <StyledPaper elevation={10}>
        <Grid align="center">
          <Avatar sx={{ bgcolor: pink[50] }}>
            <FaceIcon color="secondary" fontSize="large" />
          </Avatar>
          <h1>Give your honest review!</h1>
        </Grid>
        <form onSubmit={handleSubmit}>
          <StyledAutocomplete
            disablePortal
            options={hawkerList}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Hawker"
                placeholder="hawker center name"
              />
            )}
            isOptionEqualToValue={(option, value) => option === value}
            onChange={(e, newValue) => setHawker(newValue)}
            value={hawker}
          />
          <StyledTextField
            fullWidth
            label="Store Name"
            value={storeName}
            placeholder="Be as accurate as possible!"
            onChange={handleStoreNameChange}
          />
          <StyledTextField
            fullWidth
            label="Dish Name"
            value={dishName}
            placeholder="Be as detailed as possible!"
            onChange={handleDishNameChange}
          />
          <StyledTextField
            fullWidth
            type="file"
            value={fileInputValue}
            onChange={handleFileInputChange}
          />
          <StyledTextField
            fullWidth
            label="Review"
            value={review}
            multiline
            rows={4}
            placeholder="Your honest review here!"
            onChange={handleReviewChange}
          />
          <Box>
            <Stack spacing={1}>
              <Typography variant="subtitle2">Value-for-money</Typography>
              <Rating
                name="half-rating"
                value={Number(valueRating)}
                precision={0.5}
                onChange={handleValueRatingChange}
              />
              <Typography variant="subtitle2">Satisfaction</Typography>
              <Rating
                name="half-rating"
                value={Number(satisfactionRating)}
                precision={0.5}
                onChange={handleSatisfactionRatingChange}
              />
            </Stack>
          </Box>
          <StyledButton type="submit" variant="contained" color="secondary">
            Submit
          </StyledButton>
        </form>
      </StyledPaper>
    </Grid>
  );
};

export default ReviewForm;
