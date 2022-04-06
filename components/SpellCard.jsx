import React, { useEffect, useRef, useState } from "react"
import { useContext } from "react"

import { getLevelSuffix, getSchoolName, capitalize } from "../utils/parseSpell"
import { Dispatchers } from "../pages/_app"
import { Minus, Plus } from "./Icons"

export default function (props) {
  const spell = props.spell
  const isSelected = props.selected
  const { spellbookDispatch } = useContext(Dispatchers)

  let scrollDivRef = useRef(null)
  let [isStartScroll, setIsStartScroll] = useState(true)
  let [isEndScroll, setIsEndScroll] = useState(false)

  useEffect(() => {
    setIsEndScroll(
      scrollDivRef.current && scrollDivRef.current.scrollTopMax === 0
    )
  }, [scrollDivRef.current])

  function _handleScroll(e) {
    setIsStartScroll(e.target.scrollTop === 0)
    setIsEndScroll(e.target.scrollTop === e.target.scrollTopMax)
  }

  function _handleSpellbookButton(e) {
    spellbookDispatch({
      type: isSelected ? "remove" : "add",
      payload: spell.id,
    })
  }

  return (
    <li
      className={`relative text-base p-4 m-2 rounded-xl bg-primaryLight-100 hover:shadow-primaryLight-300 border-2 border-primaryLight-300 hover:border-primaryLight-600 transition-colors text-primaryLight-800 ${
        !spell.visible ? "hidden" : ""
      }`}
    >
      <div className="flex justify-between">
        <h3 className="font-bold text-lg self-center">{spell.name}</h3>
        <button
          className="bg-primaryLight-300 rounded-full h-10 w-10 flex justify-center top-0 right-0 self-center border-2 border-primaryLight-300 hover:border-primaryLight-600 transition-colors"
          onClick={_handleSpellbookButton}
        >
          <span className="text-2xl self-center">
            {isSelected ? Minus : Plus}
          </span>
        </button>
      </div>
      <p>
        <i className="capitalize">
          {spell.level === 0
            ? `${getSchoolName(spell.school)} cantrip`
            : `${spell.level}${getLevelSuffix(
                spell.level
              )}-level ${getSchoolName(spell.school)}`}
        </i>
      </p>
      <p>
        <b>Casting Time: </b>
        {spell.castingTime}
      </p>
      <p>
        <b>Range: </b>
        {spell.range}
      </p>
      <p>
        <b>Components: </b>
        {spell.components}
        {spell.materials === "" ? "" : `(${spell.materials})`}
      </p>
      <p>
        <b>Duration: </b>
        {spell.concentration
          ? `Concentration, ${spell.duration.toLowerCase()}`
          : spell.duration}
      </p>
      {/* Description */}
      <div className="relative indent-4 ">
        <div
          className="absolute top-0 bg-gradient-to-b from-primaryLight-100 h-10 w-full pointer-events-none"
          hidden={isStartScroll}
        />
        <div
          onScroll={_handleScroll}
          ref={scrollDivRef}
          className="max-h-48 overflow-y-auto text-gray-800"
          dangerouslySetInnerHTML={{ __html: spell.desc }}
        ></div>
        <div
          className="absolute bottom-0 bg-gradient-to-t from-primaryLight-100 h-10 w-full pointer-events-none"
          hidden={isEndScroll}
        />
      </div>
      <ul className="space-x-1 py-2 overflow-x-auto">
        {spell.class.map((cls) => (
          <li
            key={cls}
            className="inline-block text-primaryLight-900 bg-primaryLight-300 rounded-full px-2 py-0.5"
          >
            {capitalize(cls)}
          </li>
        ))}
      </ul>
    </li>
  )
}
