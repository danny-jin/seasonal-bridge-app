import {
    InputLabel,
    TextField ,
    Select,
    MenuItem,
    FormControl,
    FormHelperText
  } from "@material-ui/core";
// import React, { useState } from "react";

import { SeasonalTokens } from "../core/constants/base";

function EthTokenSection(props:any) {
  // const [tokenAmount, setTokenAmount] = useState(0);
  return (
    <div className="flex justify-center items-center">
      <FormControl variant="standard">
        <InputLabel id="eth-season-label">Season</InputLabel>
        <Select onChange={props.onChange}
                id="eth-season"
                labelId="eth-season-label"
                value={props.season}
                label="Season"
                className="w-200 my-10"
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left"
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "left"
                  },
                  getContentAnchorEl: null
                }}  >
          {
            SeasonalTokens.map((season, index:number) => {
              return <MenuItem value={index} className="flex" key={index}>
                <img src={season.img} className="w-30 h-30" alt={season.name}/>
                <label className="font-50 ml-20">{season.name}</label>
              </MenuItem>;
            })
          }
        </Select>
        <TextField id="outlined-basic" label="Swap Token amount" variant="outlined" className="my-10" type="number" size="small" inputProps={{ min: 0 }}/>
        <FormHelperText>Token Amount : {props.amount}</FormHelperText>
      </FormControl>
    </div>
  );
}
  
export default EthTokenSection;