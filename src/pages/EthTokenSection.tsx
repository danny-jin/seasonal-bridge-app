import { Select, MenuItem, FormControl } from "@material-ui/core";
import { MenuProps as MenuPropsType } from "@material-ui/core/Menu";
import { SeasonalTokens } from "../core/constants/base";

export const EthTokenSection = (props:any):JSX.Element => {

  const tokenInputStyle = 'w-full bg-charCoal text-stormDust text-18 font-medium border-1 border-limedSqruce rounded-10 py-[0.87em] px-[1.25em] shadow-tokenOption outline-none appearance-none';
  const seasonOptionStyle = 'flex justify-between items-center w-full text-white text-18 font-medium border-1 border-limedSqruce py-[0.87em] px-[1.25em]';
  const selectMenuProps: Partial<MenuPropsType> = {
    variant: 'menu',
    anchorOrigin: { vertical: "bottom", horizontal: "left" },
    transformOrigin: { vertical: "top", horizontal: "left" },
    getContentAnchorEl: null,
    // input: null
  };

  return (
    <div className="w-full swapSection">
      <FormControl variant="standard" className="w-full">
        <label className="text-artySkyBlue font-1.5em font-medium leading-1.5em">Token Select</label>
        <Select onChange={props.onChange} id="eth-season" className="p-0" value={props.season} MenuProps={selectMenuProps} disableUnderline>
          {
            Object.keys(SeasonalTokens).map((season, index:number) => {
              return <MenuItem value={season} key={index}>
                <div className={seasonOptionStyle}>
                  <div className="flex items-center">
                    <img src={SeasonalTokens[season].img} className="w-30 h-30" alt={season}/>
                    <label className="mx-20">{season}</label>
                  </div>
                  <label className="mr-20">{props.tokenAmounts[season].bscAmount}</label>
                </div>
              </MenuItem>;
            })
          }
        </Select>
        <label className="text-artySkyBlue font-1.5em font-medium mt-20">Token Amount</label>
        <input className={tokenInputStyle} value={props.swapAmount} type="number" onChange={props.onSwapAmountChange}/>
      </FormControl>
    </div>
  );
}