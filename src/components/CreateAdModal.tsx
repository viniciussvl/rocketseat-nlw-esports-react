import { Check, GameController } from 'phosphor-react';
import { Input } from './Form/Input';
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { FormEvent, useState } from 'react';
import axios from 'axios';

interface Game {
    id: string;
    title: string;
}

interface CreateAdModalProps {
    games: Game[]
}

export function CreateAdModal(props: CreateAdModalProps) {
    const validWeekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

    const [weekDays, setWeekDays] = useState<string[]>(['1']);
    const [useVoiceChannel, setUseVoiceChannel] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData)
        console.log(data);
        console.log(weekDays)
        console.log(useVoiceChannel)


        if(!data.name) {
            return;
        }

        try {
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel
            })

            alert('Anuncio criado com sucesso')

        } catch (error) {
            alert('Error')
            console.log(error)
        }

    }

    return (
        <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

        <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25">
          <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="game">Qual o game?</label>
                <select 
                    id="game" 
                    name="game"
                    defaultValue=""
                    className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none">
                        <option disabled value="">Selecione o game que deseja jogar</option>

                        {props.games.map((game, index) => (
                            <option key={index} value={game.id}>{game.title}</option>
                        ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="name">Seu nome (ou nickname)</label>
                <Input id="name" name="name" type="text" placeholder="Como te chamam dentro do game?" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                  <Input id="yearsPlaying" name="yearsPlaying" type="text" placeholder="Tudo bem ser zero" />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="discord">Qual seu discord?</label>
                  <Input id="discord" name="discord" type="text" placeholder="Usuario#0000" />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="weekDays">Quando costuma jogar?</label>

                    <ToggleGroup.Root 
                        type="multiple" 
                        className="grid grid-cols-4 gap-1"
                        value={weekDays}
                        onValueChange={setWeekDays}
                        >

                        { validWeekDays.map((day, index) =>
                            <ToggleGroup.Item key={index} value={index.toString()} 
                                className={`w-8 h-8 rounded ${weekDays.includes(`${index}`) ? 'bg-violet-500' : 'bg-zinc-900' } `}>
                                {day}
                            </ToggleGroup.Item>
                        ) 
                        }

                    </ToggleGroup.Root>
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="weekDays">Qual horário do dia?</label>

                  <div className="grid grid-cols-2 gap-1">
                    <Input id="hourStart" name="hourStart" type="time" placeholder="De" />
                    <Input id="hourEnd" name="hourEnd" type="time" placeholder="Até" />
                  </div>
                </div>
              </div>

              <label className="mt-2 flex items-center gap-2 text-sm">
                <Checkbox.Root 
                    className="w-6 h-6 p-1 rounded bg-zinc-900" 
                    checked={useVoiceChannel}
                    onCheckedChange={(checked) => {
                        if(checked === true) {
                            setUseVoiceChannel(true)
                        } else {
                            setUseVoiceChannel(false)
                        }
                    }}>

                    <Checkbox.Indicator>
                        <Check className="w-4 h-4 text-emerald-400" />
                    </Checkbox.Indicator>
                </Checkbox.Root>

                Costumo me conectar ao chat de voz
              </label>

              <footer className="mt-4 flex justify-end gap-4">
                <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-700">Cancelar</Dialog.Close>
                <button className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-800" type="submit">
                  <GameController size={24} /> Encontrar duo
                </button>
              </footer>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    )
}