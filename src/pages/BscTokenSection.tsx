import {
  InputLabel,
  TextField,
  Select,
  MenuItem,
  FormControl
} from "@material-ui/core";

import { SeasonalTokens } from "../core/constants/base";

export const BscTokenSection = (props: any):JSX.Element => {

  return (
    <div className="flex justify-center items-center">
      <FormControl variant="standard">
        <InputLabel id="bsc-season-label">Season</InputLabel>
        <Select onChange={props.onChange}
                id="bsc-season"
                labelId="bsc-season-label"
                value={props.season}
                label="Season"
                className="my-10"
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
                }} >
          {
            Object.keys(SeasonalTokens).map((season, index:number) => {
              return <MenuItem value={season} className="flex" key={index}>
                <img src={SeasonalTokens[season].img} className="w-30 h-30" alt={season}/>
                <label className="font-50 ml-20">{season}</label>
                <label className="font-50 ml-20">{props.tokenAmounts[season].bscAmount}</label>
              </MenuItem>;
            })
          }
        </Select>
        <TextField id="outlined-basic" label="Swap Token amount" variant="outlined" value={props.swapAmount} className="my-10" type="number" size="small" inputProps={{ min: 0 }} onChange={props.onSwapAmountChange}/>
      </FormControl>
    </div>
  );
}