const ANY_METHOD_ACCEPTED = '*';
const ALLOWED_METHOS = ['GET', 'POST', 'PUT', 'DELETE'];

let availableRoles = {};

export const available = rolesList => (availableRoles = rolesList);
export const verify = (role, resource, method) => {
  if (!availableRoles[role]) throw new Error(`Unknown role: ${role}`);
  if (!availableRoles[role][resource]) throw new Error(`Unknown resource: ${resource} in role "${role}"`);
  if (!ALLOWED_METHOS.includes(method))
    throw new Error(`Invalid method: ${role}, accepted values "${ALLOWED_METHOS.join('", "')}"`);
  if (!availableRoles[role][resource].includes(method) && !availableRoles[role][resource].includes(ANY_METHOD_ACCEPTED))
    throw new Error(`Unavailable method: ${method} for resource "${resource}" in role "${role}"`);
};
