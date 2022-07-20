import { Select, MenuItem, FormControl } from "@material-ui/core";

import { SeasonalTokens } from "../core/constants/base";

export const BscTokenSection = (props: any):JSX.Element => {

  const optionStyle = 'bg-charCoal text-stormDust font-medium border-1 border-limedSqruce rounded-10 py-[0.87em] px-[1.25em]';

  return (
    <div>
      <FormControl variant="standard">
        <label className="text-artySkyBlue font-1.5em font-medium">Token Select</label>
        <Select onChange={props.onChange}
                id="bsc-season"
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
              return <MenuItem value={season} key={index}>
                <div className={optionStyle+' flex'}>
                  <img src={SeasonalTokens[season].img} className="w-30 h-30" alt={season}/>
                  <label className="font-50 ml-20">{season}</label>
                  <label className="font-50 ml-20">{props.tokenAmounts[season].bscAmount}</label>
                </div>
              </MenuItem>;
            })
          }
        </Select>
        
        <label className="text-artySkyBlue font-1.5em font-medium">Token Amount</label>
        <input className={optionStyle} value={props.swapAmount} type="number" onChange={props.onSwapAmountChange}/>
      </FormControl>
    </div>
  );
}