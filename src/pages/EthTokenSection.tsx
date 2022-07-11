import { useState } from "react";
import {
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    FormHelperText
  } from "@material-ui/core";

import { SeasonalTokens } from "../core/constants/base";

function EthTokenSection() {
  const [season, SetSeason] = useState(0);
  const [tokenAmount, SetTokenAmount] = useState(0);
  const handleChange = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
    SetSeason(event.target.value as number);
  };
  return (
    <div className="flex justify-center items-center">
      <FormControl variant="standard">
        <InputLabel id="eth-season-label">Season</InputLabel>
        <Select onChange={handleChange}
                id="eth-season"
                labelId="eth-season-label"
                value={season}
                label="Season"
                className="w-200"
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
              return <MenuItem value={index} className="flex">
                <img src={season.img} className="w-30 h-30"/><label className="font-50 ml-20">{season.name}</label>
              </MenuItem>;
            })
          }
        </Select>
        <FormHelperText>Token Amount : {tokenAmount}</FormHelperText>
      </FormControl>
    </div>
  );
}
  
export default EthTokenSection;