function ListName(props) {
    return(
        <div>
            <label htmlFor="">{props.title}</label>
            <div style={{ fontWeight: 'bold' }}>{props.name}</div>
        </div>
    );
}

export default ListName;