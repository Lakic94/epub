import Button from "@material-ui/core/Button";

function Derive(props) {
    const { setNewState } = props;

    const handleChange = () => {
        setNewState({ name: "Nikola", userName: "Lakic" });
    };
    return <Button onClick={handleChange}>Nesto</Button>;
}

export default Derive;
