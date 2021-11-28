import { Answer, Exercise, isIrregularVerb } from "@/models";
import {
  computed,
  ComputedRef,
  reactive,
  readonly,
  Ref,
  unref,
  UnwrapRef,
  ToRefs,
  DeepReadonly,
} from "vue";

type ExerciseState<T extends Exercise> = {
  data: T[];
  answers: Record<number, Answer<T>>;
  exerciseDoneIds: number[];
  goodAnswerCount: number;
  wrongAnswerCount: number;
};

export type UseExercise<T extends Exercise> = {
  setData: (data: T[]) => void;
  addAnswer: (answer: UnwrapRef<Answer<T>>) => void;
  getExercise: ComputedRef<UnwrapRef<Ref<T>> | null>;
  getCorrections: ComputedRef<[T, T][]>;
  totalExercises: ComputedRef<number>;
  remainingExercises: ComputedRef<number>;
  isIrregularVerb: ComputedRef<boolean | undefined>;
  selectRandomFieldName: (record: T) => keyof T;
  checkAnswer: (answer: string, solution: string) => boolean;
  findFirstFieldToEdit: (
    fieldName: string,
    fieldNames?: string[]
  ) => string | null;
  state: DeepReadonly<UnwrapRef<Ref<ToRefs<ExerciseState<T>>>>>;
};

export function useExercise<T extends Exercise>(data?: T[]): UseExercise<T> {
  const getRandomIndex = (maxValue: number) =>
    Math.floor(Math.random() * maxValue);

  const state = reactive<ExerciseState<T>>({
    data: data || new Array<T>(),
    answers: {},
    exerciseDoneIds: [],
    goodAnswerCount: 0,
    wrongAnswerCount: 0,
  });
  function setData(data: T[]) {
    state.data = reactive(data);
  }
  const totalExercises = computed(() => state.data.length);
  const remainingExercises = computed(
    () => totalExercises.value - state.exerciseDoneIds.length
  );
  const remainingRecords = computed(() =>
    state.data.filter((r) => !state.exerciseDoneIds.includes(r.id))
  );

  const _isIrregularVerb = computed(() =>
    state.data.length > 0 ? isIrregularVerb(state.data[0]) : undefined
  );

  function selectRandomFieldName(record: T): keyof T {
    const fieldNames = (Object.keys(record) as Array<keyof T>).filter(
      (key) =>
        !(["id", "category_id"] as Array<keyof T>).includes(key) && record[key]
    );
    return fieldNames[getRandomIndex(fieldNames.length)] as keyof T;
  }

  const getExercise = computed(() => {
    const remainingExercisesToDo = remainingExercises.value;
    if (remainingExercisesToDo === 0) return null;
    const remainingRecordToDo = remainingRecords.value;
    if (remainingExercisesToDo === 1) return remainingRecordToDo[0];
    // return a number in this interval: [0; totalCount[
    return remainingRecordToDo[getRandomIndex(remainingExercisesToDo)];
  });

  const getCorrections = computed((): Array<[T, T]> => {
    const answers = unref(state.answers) as Record<number, Answer<T>>;
    return Object.values(answers).reduce(
      (acc: Array<[T, T]>, answer: Answer<T>): Array<[T, T]> => {
        const record = unref(answer) as T;
        if (!answer.correct) {
          const expectedRecord = unref(
            state.data.find((r) => r.id === answer.id)
          ) as T | undefined;
          expectedRecord && acc.push([record, expectedRecord]);
        }
        return acc;
      },
      []
    );
  });

  function addAnswer(answer: UnwrapRef<Answer<T>>) {
    if (answer.correct) {
      state.exerciseDoneIds.push(answer.id);
    }
    if (state.answers.hasOwnProperty(answer.id)) {
      return;
    }
    if (answer.correct) {
      state.goodAnswerCount++;
    } else {
      state.wrongAnswerCount++;
    }
    state.answers[answer.id] = answer;
  }

  function checkAnswer(answer: string, solution: string): boolean {
    if (solution.includes(",")) {
      const listAnswers = solution.split(",").map((v) => v.trim());
      if (answer.includes(",")) {
        const listResponse = [
          ...new Set(answer.split(",").map((v) => v.trim())),
        ];
        return (
          listResponse.length === listAnswers.length &&
          listResponse.every((v) => listAnswers.includes(v))
        );
      }
      return listAnswers.includes(answer);
    } else {
      return solution === answer;
    }
  }

  /**
   * Find the first field to edit
   *
   * @param {string} fieldName: the field name given in the exercise
   * @param {string[]} fieldNames: the field names list, if it is given then we follow the order
   *                           or this list otherwise we take the keys of the data
   * @returns {string | null} the first field found. It could be null if no field name is found.
   */
  function findFirstFieldToEdit(fieldName: string, fieldNames?: string[]) {
    if (!fieldNames) {
      fieldNames = Object.keys(state.data[0]);
    }
    for (const field of fieldNames) {
      if (field !== fieldName) {
        return field;
      }
    }

    return null;
  }

  return {
    state: readonly(state),
    setData,
    addAnswer,
    getExercise,
    getCorrections,
    remainingExercises,
    totalExercises,
    isIrregularVerb: _isIrregularVerb,
    selectRandomFieldName,
    checkAnswer,
    findFirstFieldToEdit,
  };
}
