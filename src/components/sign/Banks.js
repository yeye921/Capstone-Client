import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const BANKS = [
  '신한은행',
  'KB국민은행',
  '우리은행',
  '하나은행',
  'NH농협은행',
  'IBK기업은행',
  'KDB산업은행',
  'SC제일은행',
  '한국씨티은행',
  '카카오뱅크은행',
];

const Banks = (props) => {
  const useStyles = makeStyles((theme) => ({
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      // minWidth: 110,
      // backgroundColor: 'blue',
    },
  }));

  const classes = useStyles();
  const [searchBank, setSearchBank] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const bank_list = BANKS.map((bank) => (
    <MenuItem key={bank} value={bank}>
      {bank}
    </MenuItem>
  ));

  const handleChange = (e) => {
    setSearchBank(e.target.value);
    props.setBank(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel style={{ fontSize: 19 }}>은행</InputLabel>
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={searchBank}
          // value={value}
          onChange={handleChange}
          // onChange={onChange}
          style={{
            fontSize: 17,
            height: 57,
            width: 120,
            marginRight: 10,
          }}
        >
          {bank_list}
        </Select>
      </FormControl>
    </div>
  );
};
export default Banks;
