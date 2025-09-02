export default function Form(props: {
  formFields: Array<any>;
  showLogin: boolean;
}) {
  return (
    <div>
      <form className="form" action="#">
        {props.formFields.map((field, idx) => (
          <input
            key={idx}
            id={field.name}
            name={field.name}
            type={field.type || "text"}
            placeholder={field.placeholder || ""}
          />
        ))}
        <button type="submit">{props.showLogin ? "Login" : "Register"}</button>
      </form>
    </div>
  );
}
