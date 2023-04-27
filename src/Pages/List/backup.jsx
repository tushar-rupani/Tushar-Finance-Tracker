{groupedData.length > 0 && groupedData.map((singleData, index) => (
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead style={{ background: "rgb(160, 162, 192)", color: "white", cursor: "pointer" }}>
      <TableRow>
        <TableCell onClick={() => handleSort("month", true)}> Month <VerticalAlignCenterIcon /></TableCell>
        <TableCell align="right" onClick={() => handleSort("year", true)}>Year <VerticalAlignCenterIcon /></TableCell>
        <TableCell align="right" onClick={() => handleSort("transaction", true)}>Transaction <VerticalAlignCenterIcon /></TableCell>
        <TableCell align="right" onClick={() => handleSort("from_account", true)}>From Account <VerticalAlignCenterIcon /></TableCell>
        <TableCell align="right" onClick={() => handleSort("to_account", true)}>To Account <VerticalAlignCenterIcon /></TableCell>
        <TableCell align="right" onClick={() => handleSort("amount", true)}>Amount <VerticalAlignCenterIcon /></TableCell>
        <TableCell align="right">Image <VerticalAlignCenterIcon /></TableCell>
      </TableRow>
    </TableHead >
    <TableBody>
      {singleData.map((d, index) => (
        <TableRow
          key={index}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell component="th" scope="row">
            {d.month}
          </TableCell>
          <TableCell align="right">{d.year}</TableCell>
          <TableCell align="right">{d.transaction}</TableCell>
          <TableCell align="right">{d.from_account}</TableCell>
          <TableCell align="right">{d.to_account}</TableCell>
          <TableCell align="right">{d.currency}{d.amount}</TableCell>
          <TableCell align="right">
            <img src={d.selectedFile} alt='error in loading' width={75} height={75} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
))}