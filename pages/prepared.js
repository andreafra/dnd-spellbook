import Head from "next/head"
import Header from "../components/Header"
import SpellCard from "../components/SpellCard"

export default function Home({ spells, spellbook, settings }) {
  return (
    <div className="container mx-auto">
      <Head>
        <title>D&D Spellbook | Prepared Spells</title>
        <meta
          name="description"
          content="A Dungeons and Dragons spellbook to manage your spells"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <section className="pt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 list-none">
          {spells
            ? spells
                .filter((a) => spellbook.spells.indexOf(a.id) >= 0)
                .map((spell) => (
                  <SpellCard
                    spell={spell}
                    key={spell.id}
                    selected={spellbook.spells.indexOf(spell.id) > -1}
                  />
                ))
            : null}
        </section>
      </main>
      <footer>Copyright stuff...</footer>
    </div>
  )
}
