import { makeStyles } from "@mui/styles";
const useCapsuleStyle = makeStyles({
	chipRoot: {
		margin:2,
	  "& .MuiChip-icon": {
		order: 1, // the label has a default order of 0, so this icon goes after the label
		paddingRight:"8px",
		cursor: "pointer"
	  },
	  "& .MuiChip-deleteIcon": {
		order: 2, // since this is greater than an order of 1, it goes after the icon
	  }
	}
});

export default useCapsuleStyle;