package ru.academits.converter.generic;

import java.util.List;

/**
 * Created by Anna on 10.08.2017.
 */
public abstract class GenericConverterImpl<S, D> implements GenericConverter<S, D> {
    public abstract D convert(S source);
    public abstract List<D> convert(List<S> sourceList);

}
