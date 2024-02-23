import { SubscribeButton } from '@/components/subscribeButton';
import styles from './home.module.scss'
import { stripe } from '@/services/stripe';

async function getDataProducts() {
  const price = await stripe.prices.retrieve('price_1OdvK4K8DopU7izUmw0TnxTQ', {
    expand: ['product']
  })

  const product = {
    priceId: price.id,
    amount: price.unit_amount! / 100,
  }

  return product
 
}

export default async function Home() {

  const props = await getDataProducts();

  console.log(props)

  return (
    <main className={styles.contentContainer}>
      <section className={styles.hero}>
        <span>
          👋Oi, bem vindo(a)!
        </span>
        <h1>News about the <span>React</span> world.</h1>
        <p>
          Get access to all the publications <br />
          <span>for $9.90 month</span>
        </p>

        <SubscribeButton />
      </section>

      <img src="/images/Mulher.svg" alt='Girl coding' />
    </main>
  );
}
