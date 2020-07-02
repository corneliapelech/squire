import React, { useState } from 'react';
import {createUseStyles} from 'react-jss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faUserSlash, faUserPlus, faUsersSlash, faSave } from '@fortawesome/free-solid-svg-icons';
import { useCallback } from 'react';
import { useEffect } from 'react';

const useStyles = createUseStyles({
  textinput: {
    display: 'block',
  },
  type_pc: {
    background: '#0000ff',
  },
  type_npc: {
    background: '#00ff00',
  },
  type_enemy: {
    background: '#ff0000',
  },
});

export function SqInitiative() {
  const classes = useStyles();

  const [combatants, setCombatants] = useState([]);
  const [mode, setMode] = useState(0); // 0 = edit; 1 = update
  const [latestId, setLatestId] = useState(0);
  const [combatantId, setCombatantId] = useState(latestId);
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [initiative, setInitiative] = useState('');
  const [modifier, setModifier] = useState('');

  // eslint-disable-next-line
  const handleKeyPress = useCallback(e => {
    const {keyCode} = e;
    switch (keyCode) {
      // 1
      case 49:
      case 97:
        if (document.activeElement === document.body) {
          setType('type_pc');
        }
        break;
      // 2
      case 50:
      case 98:
        if (document.activeElement === document.body) {
          setType('type_enemy');
        }
        break;
      // 3
      case 51:
      case 99:
        if (document.activeElement === document.body) {
          setType('type_npc');
        }
        break;
      // enter
      case 13:
        mode === 0 ? addCombatant() : updateCombatant();
        document.activeElement.blur();
        break;
      default:
        break;
    }
  });

  useEffect(() => {
    window.addEventListener('keyup', handleKeyPress);

    return () => {
      window.removeEventListener('keyup', handleKeyPress);
    }
  }, [handleKeyPress]);

  const combatantsItems = combatants
    .sort((a, b) => b.initiative - a.initiative === 0 ? b.modifier - a.modifier : b.initiative - a.initiative)
    .map(participant =>
      <li key={participant.id}
        className={classes[participant.type]}>
          <span title={isNaN(participant.modifier) ? null : participant.modifier}>
            {participant.initiative}
          </span>
          <span>{participant.name}</span>
          <span>
            <FontAwesomeIcon icon={faUserEdit} onClick={() => edit(participant)} />
            <FontAwesomeIcon icon={faUserSlash} onClick={() => remove(participant)} />
          </span>
      </li>
  );

  function clearList() {
    setCombatants([]);
  }
  function clearFormFields() {
    setType('');
    setName('');
    setInitiative('');
    setModifier('');
  }

  function addCombatant() {
    setCombatants([...combatants, {
      id: latestId,
      type,
      name,
      initiative: parseInt(initiative),
      modifier: parseInt(modifier)
    }]);
    setLatestId(latestId + 1);
    clearFormFields();
  }
  function updateCombatant() {
    combatants.map(participant => {
      if (participant.id === combatantId) {
        participant.type = type;
        participant.name = name;
        participant.initiative = parseInt(initiative);
        participant.modifier = parseInt(modifier);
      }
      return participant;
    });
    setCombatantId('');
    clearFormFields();
    setMode(0);
  }
  function edit(participant) {
    setCombatantId(participant.id);
    setType(participant.type);
    setName(participant.name);
    setInitiative(participant.initiative ? participant.initiative : '');
    setModifier(participant.modifier ? participant.modifier : '');
    setMode(1);
  }
  function remove(participant) {
    setCombatants(combatants.filter(combatant => combatant.id !== participant.id));
  }

  return (
    <div>
      <h2>Initiative Tracker</h2>
      {combatants.length > 0 &&
      <button
          type="button" title="clear list"
          onClick={clearList}><FontAwesomeIcon icon={faUsersSlash} /></button>
      }
      <ul>{combatantsItems}</ul>
      <form>
        <div>
          <input type="radio" name="type" value="type_pc" id="typePC"
            checked={type === "type_pc"}
            onChange={e => setType(e.target.value)} />
          <label htmlFor="typePC">PC</label>

          <input type="radio" name="type" value="type_enemy" id="typeEnemy"
            checked={type === "type_enemy"}
            onChange={e => setType(e.target.value)} />
          <label htmlFor="typeEnemy">Enemy</label>

          <input type="radio" name="type" value="type_npc" id="typeNPC"
            checked={type === "type_npc"}
            onChange={e => setType(e.target.value)} />
          <label htmlFor="typeNPC">NPC</label>
        </div>

        <input
          className={classes.textinput}
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}></input>

        <input
          className={classes.textinput}
          type="number"
          placeholder="Initiative"
          value={initiative}
          onChange={e => setInitiative(e.target.value)}></input>

        <input
          className={classes.textinput}
          type="number"
          placeholder="Modifier"
          value={modifier}
          onChange={e => setModifier(e.target.value)}></input>

        <button
          type="button"
          title={mode === 0 ? 'add combatant' : 'save changes'}
          onClick={mode === 0 ? addCombatant : updateCombatant}>
            {mode === 0 ? <FontAwesomeIcon icon={faUserPlus} /> : <FontAwesomeIcon icon={faSave} />}
        </button>
      </form>
    </div>
  );
};