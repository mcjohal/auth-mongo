
const alert = (props) => {
return (
<div className="alert alert-primary lead p-3" role="alert">
{props.message}
</div>
)

}

export default alert;