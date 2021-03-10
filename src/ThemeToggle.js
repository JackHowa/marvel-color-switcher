import { FormProvider, useForm } from "react-hook-form";
import { useAppDispatch } from './App';
import SelectHeroInput from './SelectHeroInput';

function ThemeToggler() {
  // take dispatch method from App.js
  const dispatch = useAppDispatch()
  const methods = useForm();

  const onSubmit = data => dispatch({
    type: 'UPDATE_SUPER_HERO',
    id: data.theme
  })

  // should not update each change of pick
  // nested select hero input can access rhf methods
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <SelectHeroInput />
        <input type="submit" />
      </form>
    </FormProvider>
  )
}

export default ThemeToggler;