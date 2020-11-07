import React from 'react';

type BuildingFormProps = {
  initialValues: any;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

const BuildingForm = ({ initialValues, onSubmit }: BuildingFormProps) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(event);
      }}
    >
      <div>Put your form fields here. But for now, just click submit</div>
      <div>{JSON.stringify(initialValues)}</div>
      <button>Submit</button>
    </form>
  );
};

export default BuildingForm;
