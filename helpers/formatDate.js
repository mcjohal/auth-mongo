

const FormatDate = (props) => {
  const formattedDate = new Date(props.date).toLocaleDateString('en-Us',{
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
   return formattedDate;
}