"use client";
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { entities, EntityKey, specialKeys } from '@/app/lib/entities.utils';
import EntityInputSelect from './entity-input-select';
import EntityInputGroup from './entity-input-group';
import { EntityList } from '@/app/lib/definitions';
import { useActionState } from 'react';
import { ClienteState, createCliente } from '@/app/lib/actions';
import { ExclamationCircleIcon } from '@heroicons/react/16/solid';
export interface CreateRecordFormInterface<T> {
    recordModelName: (typeof entities[number]['name']);
    dependenciesData: EntityList<any>[];
}
export default function CreateRecordForm<T>({
    recordModelName,
    dependenciesData
}: CreateRecordFormInterface<T>) {

    const createActions = {
        cliente: createCliente,
    }
    // array of the keys of the record model
    const recordModelKeys = specialKeys[recordModelName] as EntityKey[];
    const initialState = {
        values: {},
        errors: {},
        dbError: '',
        message: '',
    }
    const [state, formAction] = useActionState(createActions[recordModelName], initialState);

    return (
        <form action={formAction}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* select dependencies to associate to the new record */}
                {dependenciesData.map((data, i) => {
                    return <div key={i} className="mb-4">
                        <EntityInputSelect data={data} />
                    </div>
                })}
                <br />
                <EntityInputGroup entityKeys={recordModelKeys} state={state} /> {/** add state */}
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Indietro
                </Link>
                <Button type="submit">Aggiungi {recordModelName}</Button>
                <div className="flex h-8 items-end space-x-1">
                    {state.dbError && (
                        <>
                            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                            <p className="text-sm text-red-500">{state.dbError}</p>
                        </>
                    )}
                </div>
                <div className="flex h-8 items-end space-x-1">
                    {state.message && (
                        <>
                            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                            <p className="text-sm text-red-500">{state.message}</p>
                        </>
                    )}
                </div>
            </div>
        </form>
    );
}
