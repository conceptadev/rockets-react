export const getMaskedPhone = (text: string) => {
  const numericInput = text.replace(/\D/g, '');
  const truncatedInput = numericInput.slice(0, 10);
  const phoneNumberFormat = /^(\d{3})?(\d{3})?(\d{0,4})?$/;
  const formattedNumber = truncatedInput.replace(
    phoneNumberFormat,
    (_, p1, p2, p3) => {
      const formattedGroups = [p1 && `(${p1})`, p2 && ` ${p2}`, p3 && `-${p3}`];
      return formattedGroups.filter(Boolean).join('');
    },
  );

  return formattedNumber;
};
