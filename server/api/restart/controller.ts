import { boardUseCase } from '$/useCase/boardUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: 'Hello' }),
  post: ({ user }) => ({
    status: 201,
    body: boardUseCase.restartClick(user.id),
  }),
}));
