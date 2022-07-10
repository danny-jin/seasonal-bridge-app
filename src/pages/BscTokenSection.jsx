import { useState } from "react";
import {
    InputLabel,
    Box,
    Select,
    MenuItem,
    FormControl,
    FormHelperText
  } from "@material-ui/core";
  
import ReactLoading from "react-loading";
import { SeasonTokens } from "../core/data/base";

function BscTokenSection(props) {
  const [season, SetSeason] = useState(0);
  const [tokenAmount, SetTokenAmount] = useState(0);
  const handleChange = (event: SelectChangeEvent) => {
    SetSeason(event.target.value);
  };
  return (
    <div className="flex justify-center items-center">
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="from-season-label">Season</InputLabel>
        <Select onChange={handleChange} id="from-season" labelId="from-season-label" value={season} label="Season" className="w-200">
          {
            SeasonTokens.map((season, index) => {
              return <MenuItem value={index} className="flex">
                <img src={season.img}/><label className="font-50 ml-20">{season.name}</label>
              </MenuItem>;
            })
          }
        </Select>
        <FormHelperText>Token Amount : {tokenAmount}</FormHelperText>
      </FormControl>
    </div>
  );
}
  
export default BscTokenSection;