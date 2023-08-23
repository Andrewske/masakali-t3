import styles from './styles.module.scss';
import CartForm from './CartForm';
import AddressAutoComplete from './AddressAutoCompleteFormFields';

function Page() {
  return (
    <main className={styles.wrapper}>
      <section className={styles.container}>
        <CartForm />
      </section>
    </main>
  );
}
export default Page;
