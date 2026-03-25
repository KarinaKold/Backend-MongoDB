import { Button } from "../button/Button";
import styles from "./Pagination.module.css";

export const Pagination = ({ page, setPage, lastPage }) => {
  return (
    <div className={styles.pagination}>
      <Button disabled={page === 1} onClick={() => setPage(1)}>
        В начало
      </Button>
      <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Предыдущая
      </Button>
      <div className={styles.currentPage}>{page}</div>
      <Button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
        Следующая
      </Button>
      <Button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
        В конец
      </Button>
    </div>
  );
};
